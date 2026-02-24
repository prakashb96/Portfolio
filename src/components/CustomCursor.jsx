import React, { useEffect, useRef, useCallback } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .cursor-pointer, [onclick]';

const INPUT_SELECTOR = 'input, textarea, select';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const rippleContainerRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const hoveredEl = useRef(null);
  const hidden = useRef(false);
  const rafId = useRef(null);

  /* ── Lerp loop ── */
  const animate = useCallback(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const hovered = hoveredEl.current;

    if (hidden.current) {
      // Cursor is hidden (input focused) — keep tracking but stay invisible
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
      dot.style.width = '0px';
      dot.style.height = '0px';
      dot.style.opacity = '0';
    } else if (hovered) {
      const rect = hovered.getBoundingClientRect();
      const maxSize = Math.min(rect.width, rect.height, 64);
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;

      pos.current.x += (targetX - pos.current.x) * 0.15;
      pos.current.y += (targetY - pos.current.y) * 0.15;

      dot.style.width = `${maxSize}px`;
      dot.style.height = `${maxSize}px`;
      dot.style.opacity = '0.25';
    } else {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.opacity = '1';
    }

    dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    rafId.current = requestAnimationFrame(animate);
  }, []);

  /* ── Ripple on click / touch ── */
  const spawnRipple = useCallback((x, y) => {
    const container = rippleContainerRef.current;
    if (!container) return;

    const ripple = document.createElement('span');
    ripple.className = 'cursor-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    container.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
  }, []);

  useEffect(() => {
    /* ── Mouse move ── */
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // If input is focused and user moves outside it, unhide cursor
      if (hidden.current) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const stillInInput = el?.closest?.(INPUT_SELECTOR);
        if (!stillInInput) {
          document.activeElement?.blur?.();
          hidden.current = false;
        }
        return;
      }

      // Check hover target (buttons/links + input fields, but NOT labels)
      const target = e.target?.closest?.(INTERACTIVE_SELECTOR) ||
                     e.target?.closest?.(INPUT_SELECTOR);
      hoveredEl.current = target || null;
    };

    /* ── Click ── */
    const onClick = (e) => {
      spawnRipple(e.clientX, e.clientY);
    };

    /* ── Focus / Blur on inputs ── */
    const onFocusIn = (e) => {
      if (e.target?.matches?.(INPUT_SELECTOR)) {
        hidden.current = true;
        hoveredEl.current = null;
      }
    };

    const onFocusOut = (e) => {
      if (e.target?.matches?.(INPUT_SELECTOR)) {
        hidden.current = false;
      }
    };

    /* ── Touch ── */
    const onTouchStart = (e) => {
      const t = e.touches[0];
      if (t) spawnRipple(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick, true);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate, spawnRipple]);

  return (
    <>
      {/* Smooth-following dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
      {/* Ripple container */}
      <div ref={rippleContainerRef} className="cursor-ripple-container" />
    </>
  );
};

export default CustomCursor;
