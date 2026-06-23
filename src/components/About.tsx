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
            AS A DIRECTOR AND STORYTELLER, I CRAFT EXCLUSIVE WEDDING FILMS ACROSS
            FRANCE, SWITZERLAND, AND EUROPE. MY APPROACH TRANSCENDS TRADITIONAL
            DOCUMENTATION. I CAPTURE THE INVISIBLE. THE TENSION OF A FLEETING GLANCE,
            THE SOLEMNITY OF ANCESTRAL RITUELS, AND THE RAW EMOTION THAT ECHOES
            THROUGH A ROOM. WHEN COUPLES ENTRUST ME WITH THEIR VISUAL LEGACY, MY
            MISSION IS TO TRANSFORM THEIR FLEETING MOMENTS INTO A TIMELESS,
            BREATHTAKING CINEMATIC MASTERPIECE.
          </p>
        </div>

        {/* Right Column */}
        <div className="about-right-col">
          <div className="about-right-header">
            <div className="about-right-title">
              <div className="about-right-title-line">THE</div>
              <div className="about-right-title-line">ART OF</div>
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



