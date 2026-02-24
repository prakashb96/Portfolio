import React from 'react';
import resumeImg from '../assets/resumeimg.png';
import expenseImg from '../assets/expenseimg.png';

const projects = [
  {
    title: 'GenRezume',
    subtitle: 'Resume Generator',
    description: 'A beginner-friendly resume generator platform designed for freshers with clean UI and PDF export functionality. Includes secure login to save, edit, and reuse resumes.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    link: 'https://genrezume.vercel.app/',
    issue: '#01',
    accentColor: '#4FC3F7',
    image: resumeImg,
  },
  {
    title: 'Expense',
    subtitle: 'Tracker',
    description: 'A Java-based desktop application for managing daily expenses. Supports category management, secure database storage, and full CRUD operations with MVC architecture.',
    tags: ['Java', 'Swing', 'MySQL', 'JDBC', 'Maven'],
    link: 'https://github.com/prakashb96/ExpenseTracker',
    issue: '#02',
    accentColor: '#66BB6A',
    image: expenseImg,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-12 bg-[var(--bg-color)] relative">
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-[var(--accent-color)] transform -rotate-3 opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-full h-px bg-[var(--accent-color)] transform rotate-3 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            MY WORK
          </span>
          <span className="block h-1 w-24 bg-[var(--accent-color)] mx-auto mt-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              {/* Comic Book Cover */}
              <div className="relative rounded-sm overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_60px_rgba(230,0,35,0.3)]"
                   style={{ aspectRatio: '3/4' }}>

                {/* Cover image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Halftone dot pattern overlay */}
                <div className="absolute inset-0 opacity-[0.06]"
                     style={{
                       backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                       backgroundSize: '6px 6px',
                     }}></div>


                {/* Issue number badge */}
                <div className="absolute top-12 left-4 z-10">
                  <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold backdrop-blur-sm"
                       style={{ borderColor: project.accentColor, color: project.accentColor, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    {project.issue}
                  </div>
                </div>

                {/* Main title area */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
                  <div className="mb-2">
                    <h3 className="text-5xl md:text-6xl font-black text-white uppercase leading-none tracking-tight group-hover:scale-105 transition-transform duration-300"
                        style={{
                          textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 0 20px rgba(0,0,0,0.8)',
                          WebkitTextStroke: '1px rgba(0,0,0,0.3)',
                        }}>
                      {project.title}
                    </h3>
                    <h3 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight"
                        style={{
                          color: project.accentColor,
                          textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 0 0 15px rgba(0,0,0,0.8)',
                        }}>
                      {project.subtitle}
                    </h3>
                  </div>
                </div>

                {/* Bottom strip — description + tags */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black via-black/85 to-transparent pt-20 pb-4 px-4">
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-white/10 text-gray-300 px-2 py-0.5 rounded border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 font-mono uppercase">By Prakash B</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] group-hover:text-white transition-colors">
                      View Project →
                    </span>
                  </div>
                </div>

                {/* Comic book border */}
                <div className="absolute inset-0 border-4 border-black rounded-sm pointer-events-none"></div>
                <div className="absolute inset-[4px] border border-white/10 rounded-sm pointer-events-none"></div>

                {/* Corner triangle */}
                <div className="absolute top-8 right-0 w-0 h-0"
                     style={{
                       borderLeft: '30px solid transparent',
                       borderTop: `30px solid ${project.accentColor}`,
                       opacity: 0.3,
                     }}></div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{
                       boxShadow: `inset 0 0 60px ${project.accentColor}22`,
                     }}></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
