import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img9596 from '../assets/IMG_9596.jpg';
import dsc02581 from '../assets/DSC02581.jpg';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animation for left column components
    gsap.from('.about-left-col > *', {
      scrollTrigger: {
        trigger: '.about-left-col',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
    });

    // Reveal animation for right column title lines
    gsap.from('.about-right-title-line', {
      scrollTrigger: {
        trigger: '.about-right-col',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Reveal animation for the right image
    gsap.from('.about-right-image-wrapper', {
      scrollTrigger: {
        trigger: '.about-right-image-wrapper',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="about-section-custom">
      <div className="about-container-custom">
        {/* Left Column */}
        <div className="about-left-col">

          <div className="about-portrait-wrapper">
            <img src={img9596} alt="Photographer Portrait" className="about-portrait-img" />
          </div>
          <p className="about-paragraph-text">
            As a director and storyteller, I craft exclusive wedding films across
            France, Switzerland, and Europe. My approach transcends traditional
            documentation—I capture the invisible. The tension of a fleeting glance,
            the solemnity of ancestral rituals, and the raw emotion that echoes
            through a room. When couples entrust me with their visual legacy, my
            mission is to transform their fleeting moments into a timeless,
            breathtaking cinematic masterpiece.
          </p>
        </div>
 
        {/* Right Column */}
        <div className="about-right-col">
          <div className="about-right-header">
            <div className="about-right-title">
              <div className="about-right-title-line">THE ART OF</div>
              <div className="about-right-title-line">CINEMATIC</div>
              <div className="about-right-title-line">STORYTELLING</div>
            </div>
          </div>
          <div className="about-right-image-wrapper">
            <img src={dsc02581} alt="Wedding Art" className="about-right-image" />
          </div>
        </div>
      </div>
    </section>
  );
};



