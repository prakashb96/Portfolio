"""
Competitive Programming Stats Scraper
======================================
Fetches rating, ranking, and problems-solved data from
LeetCode, CodeChef, and Codeforces, then writes the
results to public/stats.json for the portfolio site.

Uses only Python standard library (no pip needed).

Usage:
    python scripts/scraper.py
"""

import json
import os
import re
import ssl
import sys
import urllib.parse
import urllib.request

# Fix Windows console encoding for unicode characters like ★
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ─────────────────────────────────────────────
# ✏️  CONFIGURE YOUR USERNAMES HERE
# ─────────────────────────────────────────────
LEETCODE_USERNAME = "prakashme"
CODECHEF_USERNAME = "prakashb"
CODEFORCES_HANDLE = "Prakashb"
# ─────────────────────────────────────────────

# Fallback values (used if any API call fails)
FALLBACK_STATS = [
    {"platform": "LeetCode",   "rating": "1917",        "rank": "Top 3.93%",      "solved": "472",  "color": "#FFA116"},
    {"platform": "CodeChef",   "rating": "1727 (3★)",   "rank": "#7430 Global",   "solved": "500",  "color": "#5B4638"},
    {"platform": "Codeforces", "rating": "1264",        "rank": "Pupil",          "solved": "65",   "color": "#1F8ACB"},
]

OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "stats.json")

# SSL context — try verified first, fall back to unverified if needed
try:
    _ctx = ssl.create_default_context()
    # Quick test to see if certs work
    urllib.request.urlopen("https://example.com", timeout=5, context=_ctx)
except Exception:
    _ctx = ssl._create_unverified_context()



# ── Helpers ──────────────────────────────────────────


def _get_json(url, headers=None, data=None):
    """Make an HTTP request and return parsed JSON."""
    req = urllib.request.Request(url, data=data, headers=headers or {})
    with urllib.request.urlopen(req, timeout=20, context=_ctx) as resp:
        return json.loads(resp.read().decode("utf-8"))


# ── LeetCode ─────────────────────────────────────────


def fetch_leetcode(username: str) -> dict:
    """Fetch LeetCode stats via the public GraphQL API."""
    url = "https://leetcode.com/graphql/"
    headers = {
        "Content-Type": "application/json",
        "Referer": f"https://leetcode.com/{username}/",
        "Origin": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
    }

    # Query 1 — contest rating & ranking
    profile_payload = json.dumps({
        "query": """
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                profile { ranking }
            }
            userContestRanking(username: $username) {
                rating
                topPercentage
            }
        }
        """,
        "variables": {"username": username},
    }).encode("utf-8")

    profile_data = _get_json(url, headers=headers, data=profile_payload)
    contest = profile_data.get("data", {}).get("userContestRanking") or {}
    rating = contest.get("rating")
    top_pct = contest.get("topPercentage")

    rating_str = str(int(rating)) if rating else "N/A"
    rank_str = f"Top {top_pct:.2f}%" if top_pct else "N/A"

    # Query 2 — problems solved
    solved_payload = json.dumps({
        "query": """
        query getUserSolved($username: String!) {
            matchedUser(username: $username) {
                submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
            }
        }
        """,
        "variables": {"username": username},
    }).encode("utf-8")

    solved_data = _get_json(url, headers=headers, data=solved_payload)
    submissions = (
        solved_data.get("data", {})
        .get("matchedUser", {})
        .get("submitStatsGlobal", {})
        .get("acSubmissionNum", [])
    )
    total_solved = 0
    for item in submissions:
        if item.get("difficulty") == "All":
            total_solved = item.get("count", 0)
            break

    return {
        "platform": "LeetCode",
        "rating": rating_str,
        "rank": rank_str,
        "solved": str(total_solved),
        "color": "#FFA116",
    }


# ── Codeforces ───────────────────────────────────────


def fetch_codeforces(handle: str) -> dict:
    """Fetch Codeforces stats via the public REST API."""
    headers = {"User-Agent": "Mozilla/5.0"}

    # User info → rating, rank
    encoded_handle = urllib.parse.quote(handle)
    info = _get_json(f"https://codeforces.com/api/user.info?handles={encoded_handle}", headers=headers)
    user = info["result"][0]
    rating = user.get("maxRating", user.get("rating", "N/A"))
    rank = user.get("maxRank", user.get("rank", "Unrated"))
    rank = rank.capitalize() if isinstance(rank, str) else rank

    # Submissions → count unique solved problems
    subs = _get_json(f"https://codeforces.com/api/user.status?handle={encoded_handle}", headers=headers)
    solved_set = set()
    for sub in subs.get("result", []):
        if sub.get("verdict") == "OK":
            prob = sub.get("problem", {})
            prob_id = f"{prob.get('contestId', '')}{prob.get('index', '')}"
            solved_set.add(prob_id)

    return {
        "platform": "Codeforces",
        "rating": str(rating),
        "rank": rank,
        "solved": str(len(solved_set)),
        "color": "#1F8ACB",
    }


# ── CodeChef ─────────────────────────────────────────


def _scrape_codechef_solved(username: str) -> str:
    """Scrape the CodeChef profile page for total problems solved."""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/120.0.0.0 Safari/537.36",
        }
        req = urllib.request.Request(
            f"https://www.codechef.com/users/{username}", headers=headers,
        )
        with urllib.request.urlopen(req, timeout=20, context=_ctx) as resp:
            html = resp.read().decode("utf-8")
        match = re.search(r"Total Problems Solved.*?(\d+)", html)
        return match.group(1) if match else "N/A"
    except Exception:
        return "N/A"


def fetch_codechef(username: str) -> dict:
    """Fetch CodeChef stats via the community API + profile scraping."""
    headers = {"User-Agent": "Mozilla/5.0"}
    url = f"https://cp-rating-api.vercel.app/codechef/{username}"
    data = _get_json(url, headers=headers)

    rating = data.get("rating", "N/A")
    stars_raw = data.get("stars", "")
    # Build e.g. "1727 (3★)"
    stars_str = f"{stars_raw}★" if stars_raw else ""
    rating_str = f"{rating} ({stars_str})" if stars_str else str(rating)

    global_rank = data.get("globalRank", "N/A")
    rank_str = f"#{global_rank} Global" if global_rank and global_rank != "N/A" else "N/A"

    # The cp-rating-api doesn't return problems solved, so scrape the profile page
    solved = _scrape_codechef_solved(username)

    return {
        "platform": "CodeChef",
        "rating": rating_str,
        "rank": rank_str,
        "solved": str(solved),
        "color": "#5B4638",
    }


# ── Main ─────────────────────────────────────────────


def main():
    results = []
    fetchers = [
        ("LeetCode",   lambda: fetch_leetcode(LEETCODE_USERNAME)),
        ("CodeChef",   lambda: fetch_codechef(CODECHEF_USERNAME)),
        ("Codeforces", lambda: fetch_codeforces(CODEFORCES_HANDLE)),
    ]

    for platform, fetcher in fetchers:
        try:
            print(f"  Fetching {platform} stats...")
            data = fetcher()
            results.append(data)
            print(f"  OK {platform}: rating={data['rating']}, rank={data['rank']}, solved={data['solved']}")
        except Exception as exc:
            print(f"  WARN {platform} fetch failed: {exc}")
            # Use the matching fallback entry
            fallback = next((fb for fb in FALLBACK_STATS if fb["platform"] == platform), None)
            if fallback:
                results.append(fallback)
                print(f"  Using fallback for {platform}")

    # Ensure order: LeetCode, CodeChef, Codeforces
    order = {"LeetCode": 0, "CodeChef": 1, "Codeforces": 2}
    results.sort(key=lambda x: order.get(x["platform"], 99))

    # Write JSON
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    abs_path = os.path.abspath(OUTPUT_PATH)
    print(f"\n  Stats written to {abs_path}")


if __name__ == "__main__":
    main()
