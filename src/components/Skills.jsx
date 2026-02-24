import React from 'react';

const skillsData = [
  { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs'] },
  { category: 'Databases', items: ['SQL', 'MongoDB'] },
  { category: 'Languages', items: ['C++', 'Java', 'Python', 'JavaScript', 'SQL'] },
  { category: 'Tools & DevOps', items: ['Git', 'GitHub', 'Maven', 'Jenkins', 'GitHub Actions'] },
  { category: 'Core Skills', items: ['DSA', 'OOPS', 'DBMS', 'Operating Systems', 'Computer Networks', 'Agile', 'CI/CD'] },
];

const Skills = () => {
  return (
    <section id="skills" className="py-12 bg-[var(--bg-color)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center glitch" data-text="SKILLS & ARSENAL">
           SKILLS &amp; ARSENAL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-[var(--secondary-color)] p-5 rounded-lg border border-gray-800 hover:border-[var(--accent-color)] transition-colors duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-color)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[var(--accent-color)] transition-colors">
                {skillGroup.category}
              </h3>

              <ul className="space-y-2">
                {skillGroup.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-400 group-hover:text-gray-200 transition-colors">
                    <span className="w-2 h-2 bg-[var(--accent-color)] mr-2 transform rotate-45"></span>
                    {item}
                  </li>
                ))}
              </ul>
              
              {/* Decoration */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-[var(--accent-color)] opacity-5 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
