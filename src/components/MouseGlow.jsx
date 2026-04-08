import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MouseGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 992) return undefined;

    const moveCursor = (e) => {
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out'
      });

      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power3.out'
      });
    };

    const grow = () => ringRef.current?.classList.add('cursor-grow');
    const shrink = () => ringRef.current?.classList.remove('cursor-grow');

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, .project-card, .plan-card, .hover-panel').forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button, .project-card, .plan-card, .hover-panel').forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
