import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [logoText, setLogoText] = useState('FILM BY JANAR');

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const isDarkSection = ['hero', 'about', 'experience'].includes(activeSection);

  // Smoothly transition logo text when section changes
  useEffect(() => {
    const targetText = (() => {
      switch (activeSection) {
        case 'about':
          return 'ABOUT';
        case 'projects':
          return 'PROJECTS';
        case 'experience':
          return 'EVENTS';
        case 'contact':
          return 'CONTACT';
        case 'hero':
        default:
          return 'FILM BY JANAR';
      }
    })();

    if (logoText !== targetText) {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            setLogoText(targetText);
            gsap.fromTo(logoRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
            );
          }
        });
      } else {
        setLogoText(targetText);
      }
    }
  }, [activeSection, logoText]);

  // Monitor scroll for header background adjustment
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'experience', 'contact'];
      // Check which section occupies the viewport center (30% from the top)
      const scrollPos = window.scrollY + window.innerHeight * 0.3;

      let currentSection = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially to set the correct active section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for slide-in menu drawer
  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set(drawer, { translateX: '100%' });
      gsap.set(overlay, { opacity: 0, display: 'block' });
      gsap.set('.drawer-item', { opacity: 0, y: 40 });
      gsap.set('.drawer-footer-left, .drawer-footer-right', { opacity: 0, y: 20 });

      tl.to(overlay, {
        opacity: 1,
        duration: 0.5,
      })
        .to(drawer, {
          translateX: '0%',
          duration: 0.8,
          ease: 'power4.inOut',
        }, '-=0.45')
        .to('.drawer-item', {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
        }, '-=0.35')
        .to('.drawer-footer-left, .drawer-footer-right', {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
        }, '-=0.3');

    } else {
      document.body.style.overflow = '';

      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

      tl.to('.drawer-item', {
        opacity: 0,
        y: -20,
        stagger: 0.04,
        duration: 0.3,
      })
        .to(drawer, {
          translateX: '100%',
          duration: 0.65,
        }, '-=0.2')
        .to(overlay, {
          opacity: 0,
          duration: 0.45,
          onComplete: () => {
            gsap.set(overlay, { display: 'none' });
          }
        }, '-=0.45');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const scrollToSection = (id: string) => {
    setIsDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Allow drawer close animation to complete or trigger scroll immediately
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const renderAnimatedText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        style={{
          transitionDelay: `${index * 0.02}s`,
        }}
        className="char"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const menuItems = [
    { num: '01', id: 'hero', name: 'Home' },
    { num: '02', id: 'about', name: 'About' },
    { num: '03', id: 'projects', name: 'Projects' },
    { num: '04', id: 'experience', name: 'Events' },
    { num: '05', id: 'contact', name: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isDarkSection ? 'theme-dark' : 'theme-light'}`}>
        <div className="navbar-container">
          <a
            ref={logoRef}
            href="#hero"
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
          >
            {logoText}
          </a>

          <div className="navbar-right">
            <ul className="navbar-links">
              <li>
                <a
                  href="#hero"
                  className="navbar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('hero');
                  }}
                >
                  {renderAnimatedText('Home')}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="navbar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                >
                  {renderAnimatedText('Projects')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="navbar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  {renderAnimatedText('Contact')}
                </a>
              </li>
            </ul>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="navbar-menu-btn"
              aria-label="Open menu"
              type="button"
            >
              ••
            </button>
          </div>
        </div>
      </nav>

      {/* Side Menu Drawer & Overlay (unseen.co style) */}
      <div
        ref={overlayRef}
        className="drawer-overlay"
        onClick={() => setIsDrawerOpen(false)}
        style={{ display: 'none' }}
      />

      <div ref={drawerRef} className="menu-drawer">
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="drawer-close-btn"
          aria-label="Close menu"
          type="button"
        >
          <X size={18} />
        </button>

        <div className="drawer-content">
          <ul className="drawer-links-list">
            {menuItems.map((item) => (
              <li key={item.id} className="drawer-item">
                <span className="drawer-item-num">{item.num}</span>
                <a
                  href={`#${item.id}`}
                  className={`drawer-item-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {renderAnimatedText(item.name)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="drawer-footer">
          <div className="drawer-footer-left">
            <a href="mailto:contact@filmby.dev">contact@filmby.dev</a>
            <a href="tel:+33612345678">+33 6 12 34 56 78</a>
          </div>
          <div className="drawer-footer-right">
            <a href="https://www.instagram.com/film_by_janar/" target="_blank" rel="noopener noreferrer" className="drawer-social-link">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@film_by_janar" target="_blank" rel="noopener noreferrer" className="drawer-social-link">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
