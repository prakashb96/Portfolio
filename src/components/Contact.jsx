import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_y0w9e8v';
const TEMPLATE_ID = 'template_c4hvur5';
const PUBLIC_KEY = 'DpRNFFQOS95tR7wgT';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [emailValid, setEmailValid] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleLeaving, setBubbleLeaving] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === 'email') {
      if (value === '') {
        setEmailValid(null);
      } else {
        setEmailValid(EMAIL_REGEX.test(value));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      setEmailValid(false);
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY,
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setEmailValid(null);
      setBubbleVisible(true);
      setBubbleLeaving(false);
      // Start slide-out after 3.5s
      setTimeout(() => setBubbleLeaving(true), 3500);
      // Remove bubble after slide-out animation (0.5s)
      setTimeout(() => {
        setBubbleVisible(false);
        setBubbleLeaving(false);
        setStatus('idle');
      }, 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  // Email field border color
  const emailBorderClass =
    emailValid === null
      ? 'border-gray-700 focus:border-[var(--accent-color)]'
      : emailValid
        ? 'border-green-500'
        : 'border-red-500';

  return (
    <section id="contact" className="py-20 bg-[var(--bg-color)] relative">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
       
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading area — only the h2 shifts, nothing else moves */}
        <div className="relative mb-12">
          <h2
            className={`text-4xl md:text-5xl font-bold text-center glitch relative z-30 transition-transform duration-500 ease-out ${
              bubbleVisible && !bubbleLeaving ? 'md:-translate-x-20' : 'translate-x-0'
            }`}
            data-text="GET IN TOUCH"
          >
            GET IN TOUCH
          </h2>

          {/* Comic speech bubble — absolutely positioned, doesn't affect any layout */}
          <div
            className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 transition-all duration-500 ease-out pointer-events-none ${
              bubbleVisible
                ? bubbleLeaving
                  ? 'translate-x-8 opacity-0 scale-95'
                  : 'translate-x-0 opacity-100 scale-100'
                : 'translate-x-[120%] opacity-0 scale-90'
            }`}
            style={{ animation: bubbleVisible && !bubbleLeaving ? 'slideInRight 0.5s ease-out' : 'none' }}
          >
            <div
              className="relative bg-white rounded-[2rem] px-5 py-3 border-[3px] border-black shadow-[4px_4px_0_#000] whitespace-nowrap text-center"
              style={{ fontFamily: "'Bangers', cursive" }}
            >
              {/* Speech bubble tail pointing left */}
              <div
                className="absolute top-1/2 -left-5 -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderRight: '20px solid black',
                }}
              ></div>
              <div
                className="absolute top-1/2 -left-[17px] -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '17px solid white',
                }}
              ></div>
              <p className="text-black text-lg md:text-xl tracking-wide leading-snug uppercase">
                MESSAGE SENT SUCCESSFULLY!
              </p>
              <p className="text-black text-base md:text-lg tracking-wide mt-0.5 uppercase">
                I'LL GET BACK TO YOU SOON <span className="text-[var(--accent-color)]">🕷️</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--secondary-color)] p-8 md:p-12 shadow-2xl skew-x-2 border-l-4 border-[var(--accent-color)]">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 transform -skew-x-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[var(--bg-color)] border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                  placeholder="Peter Parker"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full bg-[var(--bg-color)] border text-white px-4 py-3 focus:outline-none transition-colors ${emailBorderClass}`}
                  placeholder="spidey@example.com"
                />
                {emailValid === false && (
                  <p className="text-red-400 text-xs mt-1">Please enter a valid email address.</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-[var(--bg-color)] border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                placeholder="With great power comes great responsibility..."
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
               <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full sm:w-auto px-8 py-3 font-bold uppercase tracking-wider transition-colors ${
                    status === 'sending'
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-[var(--accent-color)] text-white hover:bg-red-700'
                  }`}
               >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
               </button>
               
               <a 
                   href="/rePrakash__b.pdf" 
                  download 
                  className="text-gray-400 hover:text-white underline decoration-[var(--accent-color)] underline-offset-4"
               >
                  Download Resume
               </a>
            </div>


            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-500 text-red-400 text-sm text-center rounded">
                ❌ Something went wrong. Please fill all fields and try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
