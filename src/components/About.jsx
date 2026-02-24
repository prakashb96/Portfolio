import React from 'react';
import Img from '../assets/myimg.jpeg'


const About = () => {
  return (
    <section id="about" className="py-20 bg-[var(--bg-color)] text-white relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          
          {/* Image Column — centered within its half */}
          <div className="md:w-5/12 flex justify-center mb-10 md:mb-0">
            <div className="relative w-72 h-72 group">
               <div className="absolute inset-0 border-4 border-[var(--accent-color)] transform -rotate-6 transition-transform group-hover:-rotate-3"></div>
               <div className="absolute inset-0 bg-gray-800 transform rotate-3 flex items-center justify-center overflow-hidden transition-transform group-hover:rotate-0">
                  <img 
                    src={Img} 
                    alt="Profile" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
               </div>
               {/* Glitch overlays */}
               <div className="absolute top-0 left-0 w-full h-full bg-[var(--accent-color)] opacity-0 group-hover:opacity-20 transition-opacity duration-100 mix-blend-multiply"></div>
            </div>
          </div>

          {/* Text Column */}
          <div className="md:w-7/12">
            <h2 className="text-4xl font-bold mb-6 relative inline-block">
              ABOUT <span className="text-[var(--accent-color)]">ME</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--accent-color)] transform -skew-x-12"></span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I am a Computer Science and Business Systems undergraduate at KIT – Kalaignar Karunanidhi 
              Institute of Technology (2023–2027) with a strong interest in Software Development and 
              Competitive Programming. I enjoy solving complex problems and building efficient, scalable applications.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              My expertise includes full-stack web development using React, Node.js, Express, and MongoDB, 
              along with strong proficiency in C++, Java, Python, and SQL. I actively participate in coding 
              contests and hackathons, continuously sharpening my problem-solving and system design skills.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="p-4 border-l-2 border-[var(--accent-color)] bg-gray-900/50">
                  <h3 className="font-bold text-xl mb-1">1000+</h3>
                  <p className="text-sm text-gray-400">Problems Solved</p>
               </div>
               <div className="p-4 border-l-2 border-[var(--accent-color)] bg-gray-900/50">
                  <h3 className="font-bold text-xl mb-1">100+</h3>
                  <p className="text-sm text-gray-400">Contests Participated</p>
               </div>
            </div>
          </div>

        </div>
      </div>
       {/* Decorative Lines */}
       <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent transform skew-x-12 opacity-30 pointer-events-none"></div>
    </section>
  );
};

export default About;
