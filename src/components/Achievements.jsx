import React from 'react';
import { FaTrophy, FaMedal, FaStar, FaCode, FaFlagCheckered, FaLaptopCode } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaMedal />,
    title: 'Runner-Up – National Hackathon',
    desc: '24-hour National Level Hackathon at AMC Engineering College, Bengaluru',
    color: '#FFD700',
  },
  {
    icon: <FaTrophy />,
    title: 'Top 10 – 24hr Hackathon',
    desc: 'Secured Top 10 rank in a 24-hour hackathon competition',
    color: '#FFA116',
  },
  {
    icon: <FaStar />,
    title: 'Top 20 – 12hr Hackathon',
    desc: 'Achieved Top 20 rank in a 12-hour hackathon',
    color: '#1F8ACB',
  },
  {
    icon: <FaCode />,
    title: '1000+ Problems Solved',
    desc: 'Solved 1000+ problems across LeetCode, CodeChef, Codeforces, and other platforms',
    color: '#E60023',
  },
  {
    icon: <FaFlagCheckered />,
    title: '100+ Contests',
    desc: 'Participated in 100+ competitive programming contests across platforms',
    color: '#2F8D46',
  },
  {
    icon: <FaLaptopCode />,
    title: 'Active Hackathon Participant',
    desc: 'Regular participant in inter-college hackathons and coding events',
    color: '#9B59B6',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-12 bg-[var(--bg-color)] relative overflow-hidden">
      {/* Decorative diagonal stripe */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[var(--accent-color)] opacity-[0.03] transform rotate-45"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[var(--accent-color)] opacity-[0.03] transform rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="text-white">MY </span>
          <span className="text-[var(--accent-color)]">ACHIEVEMENTS</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Hackathon wins, competitive programming milestones, and community contributions.
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-5 bg-[var(--secondary-color)] border border-gray-800
                         hover:border-[var(--accent-color)] transition-all duration-300
                         transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--accent-color)]/5
                         group cursor-default"
            >
              {/* Icon */}
              <div
                className="text-3xl shrink-0 p-3 rounded-lg bg-gray-900/50 group-hover:scale-110 transition-transform duration-300"
                style={{ color: achievement.color }}
              >
                {achievement.icon}
              </div>

              {/* Info */}
              <div>
                <h4 className="font-bold text-white text-lg group-hover:text-[var(--accent-color)] transition-colors">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-400">{achievement.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
