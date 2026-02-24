// Vercel Serverless Function — /api/stats
// Fetches live stats from LeetCode, CodeChef, and Codeforces server-side (no CORS issues)

const LEETCODE_USERNAME = 'prakashme';
const CODECHEF_USERNAME = 'prakashb';
const CODEFORCES_HANDLE = 'Prakashb';

const FALLBACK_STATS = [
    { platform: 'LeetCode', rating: '1917', rank: 'Top 3.93%', solved: '472', color: '#FFA116' },
    { platform: 'CodeChef', rating: '1727 (3★)', rank: '#7430 Global', solved: '500', color: '#5B4638' },
    { platform: 'Codeforces', rating: '1264', rank: 'Pupil', solved: '65', color: '#1F8ACB' },
];

// ─── LeetCode ─────────────────────────────────────────

async function fetchLeetCode(username) {
    const url = 'https://leetcode.com/graphql/';
    const headers = {
        'Content-Type': 'application/json',
        'Referer': `https://leetcode.com/${username}/`,
        'Origin': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    };

    // Contest rating & ranking
    const profileRes = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: `query getUserProfile($username: String!) {
        matchedUser(username: $username) { profile { ranking } }
        userContestRanking(username: $username) { rating topPercentage }
      }`,
            variables: { username },
        }),
    });
    if (!profileRes.ok) throw new Error(`LeetCode profile: HTTP ${profileRes.status}`);
    const profileData = await profileRes.json();
    const contest = profileData?.data?.userContestRanking || {};
    const rating = contest.rating ? Math.round(contest.rating).toString() : 'N/A';
    const rank = contest.topPercentage ? `Top ${contest.topPercentage.toFixed(2)}%` : 'N/A';

    // Problems solved
    const solvedRes = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: `query getUserSolved($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal { acSubmissionNum { difficulty count } }
        }
      }`,
            variables: { username },
        }),
    });
    if (!solvedRes.ok) throw new Error(`LeetCode solved: HTTP ${solvedRes.status}`);
    const solvedData = await solvedRes.json();
    const submissions = solvedData?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
    const allEntry = submissions.find((s) => s.difficulty === 'All');
    const solved = allEntry ? allEntry.count.toString() : 'N/A';

    return { platform: 'LeetCode', rating, rank, solved, color: '#FFA116' };
}

// ─── Codeforces ───────────────────────────────────────

async function fetchCodeforces(handle) {
    const infoRes = await fetch(
        `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    if (!infoRes.ok) throw new Error(`Codeforces info: HTTP ${infoRes.status}`);
    const info = await infoRes.json();
    const user = info.result[0];
    const rating = (user.maxRating ?? user.rating ?? 'N/A').toString();
    let rank = user.maxRank ?? user.rank ?? 'Unrated';
    rank = typeof rank === 'string' ? rank.charAt(0).toUpperCase() + rank.slice(1) : rank;

    const subsRes = await fetch(
        `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    if (!subsRes.ok) throw new Error(`Codeforces subs: HTTP ${subsRes.status}`);
    const subs = await subsRes.json();
    const solvedSet = new Set();
    for (const sub of subs.result || []) {
        if (sub.verdict === 'OK') {
            const prob = sub.problem || {};
            solvedSet.add(`${prob.contestId ?? ''}${prob.index ?? ''}`);
        }
    }

    return { platform: 'Codeforces', rating, rank, solved: solvedSet.size.toString(), color: '#1F8ACB' };
}

// ─── CodeChef ─────────────────────────────────────────

async function fetchCodeChef(username) {
    const res = await fetch(`https://cp-rating-api.vercel.app/codechef/${username}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) throw new Error(`CodeChef: HTTP ${res.status}`);
    const data = await res.json();

    const rating = data.rating ?? 'N/A';
    const stars = data.stars ? `${data.stars}★` : '';
    const ratingStr = stars ? `${rating} (${stars})` : rating.toString();
    const globalRank = data.globalRank;
    const rankStr = globalRank ? `#${globalRank} Global` : 'N/A';

    // cp-rating-api doesn't return problemsSolved — use fallback for that field
    const fallback = FALLBACK_STATS.find((s) => s.platform === 'CodeChef');
    const solved = fallback?.solved ?? 'N/A';

    return { platform: 'CodeChef', rating: ratingStr, rank: rankStr, solved, color: '#5B4638' };
}

// ─── Handler ──────────────────────────────────────────

export default async function handler(req, res) {
    const results = [];
    const fetchers = [
        { platform: 'LeetCode', fn: () => fetchLeetCode(LEETCODE_USERNAME) },
        { platform: 'CodeChef', fn: () => fetchCodeChef(CODECHEF_USERNAME) },
        { platform: 'Codeforces', fn: () => fetchCodeforces(CODEFORCES_HANDLE) },
    ];

    await Promise.all(
        fetchers.map(async ({ platform, fn }) => {
            try {
                const data = await fn();
                results.push(data);
            } catch (err) {
                console.warn(`[stats] ${platform} failed:`, err.message);
                const fallback = FALLBACK_STATS.find((s) => s.platform === platform);
                if (fallback) results.push(fallback);
            }
        })
    );

    // Sort: LeetCode, CodeChef, Codeforces
    const order = { LeetCode: 0, CodeChef: 1, Codeforces: 2 };
    results.sort((a, b) => (order[a.platform] ?? 99) - (order[b.platform] ?? 99));

    // Cache for 1 hour on Vercel CDN, allow stale for 5 min while revalidating
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(results);
}
