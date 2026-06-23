import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactChannel {
  id: string;
  num: string;
  name: string;
  value: string;
  link: string;
  icon: React.ReactNode;
}

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const contactData: ContactChannel[] = [
    {
      id: 'email',
      num: '01',
      name: 'Email',
      value: 'contact@filmby.dev',
      link: 'mailto:contact@filmby.dev',
      icon: <Mail size={16} />
    },
    {
      id: 'instagram',
      num: '02',
      name: 'Instagram',
      value: '@filmbyjanar',
      link: 'https://instagram.com/filmbyjanar',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      id: 'whatsapp',
      num: '03',
      name: 'WhatsApp',
      value: '+33 6 12 34 56 78',
      link: 'https://wa.me/33612345678',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.233-1.371a9.994 9.994 0 0 0 4.779 1.206h.004c5.505 0 9.988-4.478 9.99-9.984C22.01 6.478 17.52 2 12.012 2zm0 18.294h-.003a8.277 8.277 0 0 1-4.218-1.164l-.303-.18-3.138.823.837-3.061-.197-.314a8.268 8.268 0 0 1-1.266-4.398c.002-4.57 3.723-8.29 8.293-8.29 2.215.001 4.298.863 5.862 2.43 1.564 1.566 2.424 3.65 2.422 5.865-.004 4.572-3.725 8.29-8.292 8.29z"/>
        </svg>
      )
    },
    {
      id: 'tiktok',
      num: '04',
      name: 'TikTok',
      value: '@filmbyjanar',
      link: 'https://tiktok.com/@filmbyjanar',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.58 4.22.95.89 2.22 1.41 3.49 1.56v3.9c-1.36-.05-2.72-.45-3.87-1.19-.36-.22-.7-.47-1.02-.76v7.3c-.08 2.25-1.09 4.41-2.8 5.86-1.92 1.57-4.63 2.12-7 1.4-2.61-.75-4.73-2.92-5.32-5.59-.72-3.05.61-6.39 3.25-7.98 1.4-.87 3.04-1.2 4.67-1.03v3.96c-1.12-.22-2.32.11-3.15.9-.99.88-1.32 2.37-.8 3.6.53 1.34 1.98 2.22 3.41 2.06 1.47-.07 2.76-1.22 2.92-2.68.03-1.07.01-2.14.02-3.21l.01-11.83z"/>
        </svg>
      )
    },
    {
      id: 'phone',
      num: '05',
      name: 'Phone',
      value: '+33 6 12 34 56 78',
      link: 'tel:+33612345678',
      icon: <Phone size={16} />
    },
    {
      id: 'localisation',
      num: '06',
      name: 'Location',
      value: 'Paris, France (Worldwide)',
      link: 'https://maps.google.com/?q=Paris,France',
      icon: <MapPin size={16} />
    }
  ];

  useGSAP(() => {
    // Fade and slide left visual
    gsap.fromTo('.contact-left-visual', 
      { opacity: 0, x: -40 },
      {
        scrollTrigger: {
          trigger: '.contact-split-layout',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
      }
    );

    // Fade and stagger list menu items
    gsap.fromTo('.contact-list-item',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.contact-split-layout',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
      }
    );
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="contact-section-custom">
      <div
        className="glow-blob"
        style={{
          width: '500px',
          height: '500px',
          background: 'var(--accent-glow)',
          bottom: '-10%',
          left: '10%',
          opacity: 0.04
        }}
      />

      <div className="container">
        <div className="contact-split-layout">
          {/* Left Column: Polaroid Visual Collage */}
          <div className="contact-left-visual">
            <div className="contact-collage-wrapper">
              <div className="contact-polaroid polaroid-one">
                <img src="/civil_wedding/AJ408720.JPG" alt="Let's Connect" className="polaroid-img" />
              </div>
              <div className="contact-polaroid polaroid-two">
                <img src="/civil_wedding/AJ408671.JPG" alt="Get in Touch" className="polaroid-img" />
              </div>
            </div>
            <div className="contact-tagline">
              <span className="quote-mark-contact">“</span>
              <p>TELL ME ABOUT YOUR VISION. LET'S CREATE A CINEMATIC LEGACY TOGETHER.</p>
            </div>
          </div>

          {/* Right Column: Menu List Directory */}
          <div className="contact-right-details">
            <div className="section-header-compact">
              <span className="section-tag-small">Get in touch</span>
              <h2 className="contact-main-title">Let's Work Together</h2>
              <p className="contact-subtitle-small">
                Choose the channel that works best for you. I respond within 24 hours to discuss your creative project.
              </p>
            </div>

            <div className="contact-list-menu">
              {contactData.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-list-item"
                >
                  <div className="contact-item-main">
                    <span className="contact-item-num">{channel.num}</span>
                    <h3 className="contact-item-name">{channel.name}</h3>
                  </div>
                  <div className="contact-item-details">
                    <span className="contact-item-icon">{channel.icon}</span>
                    <p className="contact-item-value">{channel.value}</p>
                    <span className="contact-item-arrow">⟶</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
