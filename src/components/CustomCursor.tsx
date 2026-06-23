import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickTo for highly optimized cursor movement
    const xToCursor = gsap.quickTo(cursor, 'left', { duration: 0.4, ease: 'power3.out' });
    const yToCursor = gsap.quickTo(cursor, 'top', { duration: 0.4, ease: 'power3.out' });

    const xToDot = gsap.quickTo(dot, 'left', { duration: 0.1, ease: 'power3.out' });
    const yToDot = gsap.quickTo(dot, 'top', { duration: 0.1, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand cursor when hovering over interactive items
      const isHoverable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('textarea') ||
        target.closest('.hoverable') ||
        target.tagName === 'A' || 
        target.tagName === 'BUTTON';

      if (isHoverable) {
        cursor.classList.add('hovered');
      } else {
        cursor.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ left: '-100px', top: '-100px' }} />
      <div ref={dotRef} className="custom-cursor-dot" style={{ left: '-100px', top: '-100px' }} />
    </>
  );
};
