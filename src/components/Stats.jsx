import React, { useState, useEffect, useRef } from 'react';

// Fallback stats (shown instantly while API loads)
const FALLBACK_STATS = [
  { platform: 'LeetCode',   rating: '1917',       rank: 'Top 3.93%',    solved: '472', color: '#FFA116' },
  { platform: 'CodeChef',   rating: '1727 (3★)',   rank: '#7430 Global', solved: '500', color: '#5B4638' },
  { platform: 'Codeforces', rating: '1264',        rank: 'Pupil',        solved: '65',  color: '#1F8ACB' },
];

const Stats = () => {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);
  const hasLoadedLive = useRef(false);

  useEffect(() => {
    if (hasLoadedLive.current) return;
    hasLoadedLive.current = true;

    // Try serverless function first → static fallback → keep hardcoded defaults
    fetch('/api/stats')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('json')) throw new Error('Not JSON response');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setStats(data);
      })
      .catch(() => {
        // In dev, /api/stats won't work (no serverless runtime) — fall back to stats.json
        return fetch('/stats.json')
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) setStats(data);
          })
          .catch(() => {});
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="stats" className="py-20 bg-[var(--bg-color)] relative clip-path-slant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
          <span className="border-b-4 border-[var(--accent-color)]">CODING STATS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.platform}
              className="bg-[var(--bg-color)] p-6 rounded-xl border border-gray-700 hover:border-[var(--accent-color)] transform hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[var(--accent-color)] transition-colors">
                {stat.platform}
              </h3>
              <div className="space-y-2">
                 <div className="flex justify-between">
                    <span className="text-gray-400">Max Rating:</span>
                    <span className="font-mono text-white" style={{color: stat.color}}>{stat.rating}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-400">Rank:</span>
                    <span className="text-white">{stat.rank}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-400">Solved:</span>
                    <span className="text-white">{stat.solved}</span>
                 </div>
              </div>

               {/* Progress bar */}
               <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-[var(--accent-color)] w-3/4 ${loading ? 'animate-pulse' : ''}`}
                    style={{ transition: 'width 0.6s ease' }}
                  ></div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
