import React from 'react';

const SpiderDrone = () => {
  return (
    <div className="fixed top-0 z-[51] pointer-events-none hidden md:block" style={{ left: '90px' }}>
      {/* Web thread from top of viewport to spider */}
      <div
        className="absolute top-0"
        style={{
          width: '1.5px',
          height: '92px',
          left: '8px',
          background: 'linear-gradient(to bottom, rgba(200,200,200,0.6), rgba(180,180,180,0.3))',
        }}
      />

      {/* Spider — bobs gently, no scroll sway */}
      <div style={{ position: 'absolute', top: '78px', left: '-32px' }}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-[droneBob_3s_ease-in-out_infinite] drop-shadow-[0_4px_12px_rgba(230,0,35,0.25)]"
        >
          {/* Thread attachment point */}
          <circle cx="100" cy="35" r="3" fill="#555" />

          {/* === ABDOMEN === */}
          <ellipse cx="100" cy="70" rx="28" ry="35" fill="#0a2a2a" stroke="#0f3535" strokeWidth="1" />
          <path d="M100 35 Q100 70 100 105" stroke="#E60023" strokeWidth="2.5" opacity="0.7" />
          <path d="M88 38 Q90 70 88 102" stroke="#E60023" strokeWidth="1.5" opacity="0.4" />
          <path d="M112 38 Q110 70 112 102" stroke="#E60023" strokeWidth="1.5" opacity="0.4" />
          <ellipse cx="100" cy="60" rx="18" ry="12" fill="#0d3333" opacity="0.5" />
          <ellipse cx="100" cy="82" rx="14" ry="8" fill="#0d3333" opacity="0.4" />

          {/* === CEPHALOTHORAX === */}
          <ellipse cx="100" cy="115" rx="20" ry="18" fill="#0a2828" stroke="#0f3535" strokeWidth="1" />
          <ellipse cx="100" cy="115" rx="12" ry="10" fill="#0c3030" opacity="0.6" />

          {/* === EYES === */}
          <circle cx="96" cy="126" r="2.5" fill="#88ddff" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="104" cy="126" r="2.5" fill="#88ddff" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="92" cy="123" r="1.5" fill="#aaeeff" opacity="0.7" />
          <circle cx="108" cy="123" r="1.5" fill="#aaeeff" opacity="0.7" />

          {/* === FANGS === */}
          <path d="M97 130 L95 137 L96 135" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
          <path d="M103 130 L105 137 L104 135" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />

          {/* === LEFT LEGS === */}
          <path d="M82 118 L55 100 L35 75 L15 55" fill="none" stroke="#E65000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 55 L8 42" fill="none" stroke="#0a7070" strokeWidth="3" strokeLinecap="round" />
          <circle cx="8" cy="42" r="2" fill="#44ccff" opacity="0.6" />
          <line x1="45" y1="88" x2="42" y2="83" stroke="#ff6622" strokeWidth="1" opacity="0.5" />

          <path d="M80 110 L48 100 L22 92 L2 100" fill="none" stroke="#E65000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 100 L-5 105" fill="none" stroke="#0a7070" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-5" cy="105" r="2" fill="#44ccff" opacity="0.6" />

          <path d="M80 105 L50 115 L25 130 L5 150" fill="none" stroke="#E65000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 150 L-2 160" fill="none" stroke="#0a7070" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-2" cy="160" r="2" fill="#44ccff" opacity="0.6" />

          <path d="M82 85 L55 65 L35 40 L20 15" fill="none" stroke="#E65000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 15 L15 5" fill="none" stroke="#0a7070" strokeWidth="3" strokeLinecap="round" />
          <circle cx="15" cy="5" r="2" fill="#44ccff" opacity="0.6" />

          {/* === RIGHT LEGS === */}
          <path d="M118 118 L145 100 L165 75 L185 55" fill="none" stroke="#E65000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M185 55 L192 42" fill="none" stroke="#0a7070" strokeWidth="3" strokeLinecap="round" />
          <circle cx="192" cy="42" r="2" fill="#44ccff" opacity="0.6" />
          <line x1="155" y1="88" x2="158" y2="83" stroke="#ff6622" strokeWidth="1" opacity="0.5" />

          <path d="M120 110 L152 100 L178 92 L198 100" fill="none" stroke="#E65000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M198 100 L205 105" fill="none" stroke="#0a7070" strokeWidth="3" strokeLinecap="round" />
          <circle cx="205" cy="105" r="2" fill="#44ccff" opacity="0.6" />

          <path d="M120 105 L150 115 L175 130 L195 150" fill="none" stroke="#E65000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M195 150 L202 160" fill="none" stroke="#0a7070" strokeWidth="3" strokeLinecap="round" />
          <circle cx="202" cy="160" r="2" fill="#44ccff" opacity="0.6" />

          <path d="M118 85 L145 65 L165 40 L180 15" fill="none" stroke="#E65000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M180 15 L185 5" fill="none" stroke="#0a7070" strokeWidth="3" strokeLinecap="round" />
          <circle cx="185" cy="5" r="2" fill="#44ccff" opacity="0.6" />

          {/* === JOINT DOTS === */}
          <circle cx="55" cy="100" r="2.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
          <circle cx="48" cy="100" r="2.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
          <circle cx="50" cy="115" r="2.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
          <circle cx="55" cy="65" r="2.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
          <circle cx="145" cy="100" r="2.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
          <circle cx="152" cy="100" r="2.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
          <circle cx="150" cy="115" r="2.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
          <circle cx="145" cy="65" r="2.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />

          {/* === BODY GLOW === */}
          <ellipse cx="100" cy="95" rx="8" ry="6" fill="#E60023" opacity="0.08">
            <animate attributeName="opacity" values="0.08;0.15;0.08" dur="3s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>
    </div>
  );
};

export default SpiderDrone;
