import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Prakash B. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6">
          <a href="https://github.com/prakashme" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[var(--accent-color)] transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/prakashb96" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[var(--accent-color)] transition-colors">
            <FaLinkedin size={20} />
          </a>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[var(--accent-color)] transition-colors">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
