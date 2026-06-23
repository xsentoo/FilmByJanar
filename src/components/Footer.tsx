import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-custom-dark">
      <div className="footer-container">
        {/* Main Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-col brand-col">
            <span className="footer-brand-logo">FILM BY JANAR</span>
            <p className="footer-brand-tagline">VISUAL STORYTELLER & VIDEOGRAPHER</p>
            <p className="footer-brand-desc">
              CAPTURING THE RAW BEAUTY OF LIGHT, MOTION, AND SPONTANEITY.
              DEDICATED TO PRESERVING LIFE'S MOST MEANINGFUL CONNECTIONS
              AND TELLING YOUR UNIQUE STORY IN AN ELEGANT, CINEMATIC FORM.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col links-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">ACCUEIL</a></li>
              <li><a href="#about">À PROPOS</a></li>
              <li><a href="#projects">PROJETS</a></li>
              <li><a href="#experience">EVENTS</a></li>
              <li><a href="#contact">CONTACT</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col services-col">
            <h4 className="footer-col-title">SERVICES</h4>
            <ul className="footer-services-list">
              <li>CIVIL WEDDINGS & STORIES</li>
              <li>TRADITIONAL CEREMONIES</li>
              <li>CORPORATE VIDEOS & BRANDS</li>
              <li>FESTIVALS & LIVE SHOWS</li>
              <li>PRE-SHOOT SESSIONS</li>
            </ul>
          </div>

          {/* Column 4: Socials & Contact Channels */}
          <div className="footer-col social-col">
            <h4 className="footer-col-title">CONNECT</h4>
            <p className="footer-social-intro">Stay updated with my latest visual creations.</p>
            <div className="footer-social-buttons">
              <a href="mailto:contact@filmby.dev" aria-label="Email" className="footer-social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              <a href="https://instagram.com/filmbyjanar" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://tiktok.com/@filmbyjanar" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer-social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.58 4.22.95.89 2.22 1.41 3.49 1.56v3.9c-1.36-.05-2.72-.45-3.87-1.19-.36-.22-.7-.47-1.02-.76v7.3c-.08 2.25-1.09 4.41-2.8 5.86-1.92 1.57-4.63 2.12-7 1.4-2.61-.75-4.73-2.92-5.32-5.59-.72-3.05.61-6.39 3.25-7.98 1.4-.87 3.04-1.2 4.67-1.03v3.96c-1.12-.22-2.32.11-3.15.9-.99.88-1.32 2.37-.8 3.6.53 1.34 1.98 2.22 3.41 2.06 1.47-.07 2.76-1.22 2.92-2.68.03-1.07.01-2.14.02-3.21l.01-11.83z" />
                </svg>
              </a>
              <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.233-1.371a9.994 9.994 0 0 0 4.779 1.206h.004c5.505 0 9.988-4.478 9.99-9.984C22.01 6.478 17.52 2 12.012 2zm0 18.294h-.003a8.277 8.277 0 0 1-4.218-1.164l-.303-.18-3.138.823.837-3.061-.197-.314a8.268 8.268 0 0 1-1.266-4.398c.002-4.57 3.723-8.29 8.293-8.29 2.215.001 4.298.863 5.862 2.43 1.564 1.566 2.424 3.65 2.422 5.865-.004 4.572-3.725 8.29-8.292 8.29z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
