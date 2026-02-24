import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1a1a1a] transform -skew-x-12 translate-x-20 border-l border-[var(--accent-color)] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[var(--accent-color)] transform skew-x-12 -translate-x-20 translate-y-20 opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 glitch" data-text="PRAKASH">
          PRAKASH
        </h1>
        <p className="text-[var(--accent-color)] text-lg md:text-xl font-semibold mb-4 tracking-wide">
          Full-Stack Developer | Aspiring Software Development Engineer
        </p>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Problem Solver passionate about building scalable web applications, 
          competitive programming, and developing user-friendly digital solutions. 
          Strong foundation in Data Structures &amp; Algorithms with hands-on full-stack experience.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-4 bg-[var(--accent-color)] text-white font-bold uppercase tracking-wider transform -skew-x-12 hover:bg-red-700 transition-colors border-2 border-transparent hover:border-white relative overflow-hidden group"
          >
            <span className="block transform skew-x-12">View Projects</span>
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider transform -skew-x-12 hover:bg-white hover:text-black transition-colors"
          >
            <span className="block transform skew-x-12">Contact Me</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
