import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EventPhoto {
  src: string;
  caption: string;
}

interface EventReview {
  text: string;
  author: string;
}

interface EventData {
  id: string;
  num: string;
  title: string;
  description: string;
  photos: EventPhoto[];
  review?: EventReview;
}

const EVENTS_DATA: EventData[] = [
  {
    id: 'corporate-events',
    num: '01',
    title: 'Corporate Events',
    description: 'CINEMATIC COVERAGE OF HIGH-PROFILE CORPORATE EVENTS, CONFERENCES, AND PRODUCT LAUNCHES. CAPTURING THE PROFESSIONAL ENERGY, KEYNOTE MOMENTS, AND NETWORKING INTERACTIONS IN POLISHED, SHARP FRAMES.',
    photos: [
      { src: '/civil_wedding/DSC02408.JPG', caption: 'KEYNOTE PRESENTATION' },
      { src: '/civil_wedding/DSC02421.JPG', caption: 'NETWORKING SESSION' },
      { src: '/civil_wedding/DSC02438.JPG', caption: 'THE STAGE' },
      { src: '/civil_wedding/DSC02441.JPG', caption: 'CLOSING GALA' }
    ],
    review: {
      text: "EXCEPTIONAL PROFESSIONALISM. THE CINEMATIC HIGHLIGHT FILM WAS A HUGE HIT WITH OUR CLIENTS.",
      author: "TechCorp Events Director"
    }
  },
  {
    id: 'work-with-artist',
    num: '02',
    title: 'WORK WITH ARTISTS',
    description: 'COLLABORATING WITH CREATIVE MINDS AND PERFORMERS TO TRANSLATE MUSIC, PASSION, AND ARTISTIC VISION INTO STUNNING CINEMATIC PORTRAITS. WE CAPTURE THE RAW EMOTION, COMMANDING STAGE PRESENCE, AND UNIQUE EXPRESSION OF ARTISTS IN THEIR ELEMENT, TRANSFORMING PERFORMANCE INTO VISUAL POETRY.',
    photos: [
      { src: '/civil_wedding/DSC02549-Modifier.JPG', caption: 'STAGE LIGHTS' },
      { src: '/civil_wedding/DSC02560.JPG', caption: 'THE CROWD' },
      { src: '/civil_wedding/DSC02993.JPG', caption: 'GUITAR SOLO' },
      { src: '/civil_wedding/DSC02996.JPG', caption: 'FESTIVAL VIBES' },
      { src: '/civil_wedding/DSC03099.JPG', caption: 'DANCE FLOOR' },
      { src: '/civil_wedding/DSC03108.JPG', caption: 'THE CHEERS' },
      { src: '/civil_wedding/DSC03127.JPG', caption: 'ELEGANT DECOR' },
      { src: '/civil_wedding/DSC03129.JPG', caption: 'LATE NIGHT SHOT' }
    ]
  }
];



export const Events: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeEventPhotos, setActiveEventPhotos] = useState<EventPhoto[]>([]);

  // Scroll animations for each event block
  useGSAP(() => {
    const blocks = gsap.utils.toArray('.event-block');
    blocks.forEach((block: any) => {
      // Fade and slide in text
      gsap.fromTo(block.querySelector('.event-text-side'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Fade and pop photos in collage
      const photos = block.querySelectorAll('.collage-photo');
      gsap.fromTo(photos,
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }, { scope: containerRef });

  // Handle lightbox zoom animations
  useEffect(() => {
    if (selectedPhoto) {
      gsap.fromTo('.lightbox-overlay', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo('.lightbox-img', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }
  }, [selectedPhoto]);

  const handlePhotoClick = (src: string, photos: EventPhoto[]) => {
    setSelectedPhoto(src);
    setActiveEventPhotos(photos);
  };

  const closeLightbox = () => {
    gsap.to('.lightbox-overlay', {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        setSelectedPhoto(null);
        setActiveEventPhotos([]);
      },
    });
  };

  const currentPhotoIndex = selectedPhoto ? activeEventPhotos.findIndex(p => p.src === selectedPhoto) : -1;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPhotoIndex !== -1 && activeEventPhotos.length > 0) {
      const prevIdx = (currentPhotoIndex - 1 + activeEventPhotos.length) % activeEventPhotos.length;
      setSelectedPhoto(activeEventPhotos[prevIdx].src);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPhotoIndex !== -1 && activeEventPhotos.length > 0) {
      const nextIdx = (currentPhotoIndex + 1) % activeEventPhotos.length;
      setSelectedPhoto(activeEventPhotos[nextIdx].src);
    }
  };

  return (
    <section id="experience" ref={containerRef} className="events-section-custom">
      <div className="events-section-container">
        {EVENTS_DATA.map((event, idx) => {
          const isEven = idx % 2 === 0;
          const isFullWidth = event.photos.length > 4;

          if (isFullWidth) {
            return (
              <div key={event.id} className="event-block block-full-width">
                {/* Text section */}
                <div className="event-text-side text-center-aligned">
                  <span className="event-number">{event.num}</span>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description max-w-none">{event.description}</p>
                </div>

                {/* Photos grid */}
                <div className="event-photos-side-full">
                  <div className="event-collage-8">
                    {event.photos.map((photo, pIdx) => {
                      const positionClasses = [
                        'photo-8-1', 'photo-8-2', 'photo-8-3', 'photo-8-4',
                        'photo-8-5', 'photo-8-6', 'photo-8-7', 'photo-8-8'
                      ];
                      return (
                        <div
                          key={photo.src}
                          className={`collage-photo ${positionClasses[pIdx]}`}
                          onClick={() => handlePhotoClick(photo.src, event.photos)}
                        >
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="collage-img"
                            loading="lazy"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={event.id}
              className={`event-block ${isEven ? 'layout-text-left' : 'layout-text-right'}`}
            >
              {/* Text column */}
              <div className="event-text-side">
                <span className="event-number">{event.num}</span>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
              </div>

              {/* Photos collage column */}
              <div className="event-photos-side">
                <div className="event-collage">
                  {event.photos.map((photo, pIdx) => {
                    const positionClasses = [
                      'photo-top-left',
                      'photo-top-right',
                      'photo-bottom-left',
                      'photo-bottom-right'
                    ];
                    return (
                      <div
                        key={photo.src}
                        className={`collage-photo ${positionClasses[pIdx]}`}
                        onClick={() => handlePhotoClick(photo.src, event.photos)}
                      >
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="collage-img"
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                  {event.review && (
                    <div className="collage-photo photo-center-review review-card">
                      <div className="review-card-content">
                        <span className="quote-mark">“</span>
                        <p className="review-text">{event.review.text}</p>
                        <h5 className="review-author">— {event.review.author}</h5>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox zoom modal */}
      {selectedPhoto && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close-btn" onClick={closeLightbox}>
            ✕
          </button>

          {/* Previous Button */}
          <button className="lightbox-nav-btn prev" onClick={handlePrevPhoto} aria-label="Previous photo">
            <ChevronLeft size={36} strokeWidth={1.2} color="#111111" />
          </button>

          <div className="lightbox-img-container" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto} alt="Zoomed Event" className="lightbox-img" />
          </div>

          {/* Next Button */}
          <button className="lightbox-nav-btn next" onClick={handleNextPhoto} aria-label="Next photo">
            <ChevronRight size={36} strokeWidth={1.2} color="#111111" />
          </button>
        </div>
      )}
    </section>
  );
};
