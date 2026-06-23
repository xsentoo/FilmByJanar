import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin();

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from('.hero-name-line', {
      y: 120,
      opacity: 0,
      skewY: 5,
      stagger: 0.2,
      duration: 1.4,
    })
      .from('.hero-bio', {
        opacity: 0,
        y: 30,
        duration: 1,
      }, '-=0.8');
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="hero-section">
      {/* Background Video */}
      <div className="hero-video-container">
        <video
          className="hero-video-bg"
          autoPlay
          loop
          muted
          playsInline
          src="/RAMYA_4K_FINAL.mp4"
        />
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-cinematic-layout">
        {/* Large Name — Left side */}
        <div className="hero-name-block">
          <div className="hero-name-line-wrapper">
            <h1 className="hero-name-line">JANAR</h1>
          </div>
        </div>

        {/* Description — Right side */}
        <div className="hero-bio">
          <p>
            I see the world through light, motion, and the
            subtle details that shape a story. Whether it's
            a wedding or a brand, my goal remains the
            same, to capture truth through a cinematic
            lens. Every video is a way to observe, to feel,
            and to translate emotion.
          </p>
        </div>
      </div>
    </section>
  );
};


