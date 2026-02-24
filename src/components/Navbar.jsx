import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { title: 'Home', href: '#hero' },
    { title: 'About', href: '#about' },
    { title: 'Skills', href: '#skills' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' },
    { title: 'Resume', href: '/rePrakash__b.pdf', external: true },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[var(--bg-color)]/90 backdrop-blur-sm border-b-2 border-[var(--accent-color)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold glitch" data-text="PRAKASH" style={{ fontFamily: 'var(--font-primary)' }}>
              PRAKASH
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="relative px-3 py-2 text-sm font-medium uppercase tracking-wider hover:text-[var(--accent-color)] transition-colors duration-300 group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent-color)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--accent-color)] hover:text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[var(--secondary-color)] border-b border-[var(--accent-color)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: toggleMenu })}
                className="text-gray-300 hover:text-[var(--accent-color)] block px-3 py-2 rounded-md text-base font-medium uppercase"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
