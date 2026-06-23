import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectPhoto {
  src: string;
  caption: string;
}

interface ProjectReview {
  text: string;
  author: string;
}

interface Project {
  id: string;
  num: string;
  title: string;
  description: string;
  photos: ProjectPhoto[];
  review: ProjectReview;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'civil-wedding',
    num: '01',
    title: 'CIVIL WEDDING & RECEPTION',
    description: 'The elegance of your first promises combined with the grandeur of your celebration. From the intimacy of the morning preparations to the electric energy of the dance floor, every moment is captured with a sharp, modern cinematic aesthetic. More than just a memory—this is the authentic and compelling feature film of your definitive day.',
    photos: [
      { src: '/civil_wedding/1.jpg', caption: 'THE VOWS' },
      { src: '/civil_wedding/AJ401092.JPG', caption: 'WARMING TONES' },
      { src: '/civil_wedding/AJ401105.JPG', caption: 'TRUE LOVE' },
      { src: '/civil_wedding/AJ401346.JPG', caption: 'GOLDEN HOUR' }
    ],
    review: {
      text: "JANAR CAPTURED THE TRUE ESSENCE OF OUR DAY. EVERY FRAME FEELS SO ALIVE AND AUTHENTIC.",
      author: "Sarah & David"
    }
  },
  {
    id: 'hindu-wedding',
    num: '02',
    title: 'TRADITIONAL & RELIGIOUS WEDDINGS',
    description: 'The brilliance of colors, the depth of sacred rituals, and the richness of shared cultural heritage. We document traditional celebrations—including Hindu weddings, Nikkah, and sacred unions—with absolute reverence for their symbols. Our goal is to elevate the joining of your two families into a visually powerful, epic cinematic journey.',
    photos: [
      { src: '/civil_wedding/AJ401364.JPG', caption: 'SACRED UNION' },
      { src: '/civil_wedding/AJ401374.JPG', caption: 'THE RITUAL' },
      { src: '/civil_wedding/AJ401672 (1).JPG', caption: 'VIBRANT JOY' },
      { src: '/civil_wedding/AJ408638.JPG', caption: 'ETERNAL PROMISE' }
    ],
    review: {
      text: "ABSOLUTELY STUNNING VIDEOGRAPHY! THE VIBRANT COLORS AND RITUALS WERE PRESERVED BEAUTIFULLY.",
      author: "Priya & Amit"
    }
  },
  {
    id: 'preshoot',
    num: '03',
    title: 'THE PRE-WEDDING SESSION',
    description: 'A timeless interlude, captured under the soft glow of the golden hour in a location tailored to your story. This intimate session allows you to connect effortlessly with the lens while creating a polished, cinematic preview film—perfect for officially revealing your wedding date to your guests.',
    photos: [
      { src: '/civil_wedding/AJ408644.JPG', caption: 'GOLDEN HOUR' },
      { src: '/civil_wedding/AJ408671.JPG', caption: 'QUIET MOMENT' },
      { src: '/civil_wedding/AJ408678.JPG', caption: 'RAW LIGHT' },
      { src: '/civil_wedding/AJ408718.JPG', caption: 'SOFT SMILE' }
    ],
    review: {
      text: "WE FELT SO RELAXED AND COMFORTABLE. THE GOLDEN HOUR SHOTS ARE PURE MAGIC.",
      author: "Chloe & Thomas"
    }
  },
  {
    id: 'engagement',
    num: '04',
    title: 'ENGAGEMENT & PROLOGUE',
    description: 'The opening chapter of your shared commitment. We capture the spontaneous joy, the warmth of your families, and the initial steps of your lifetime journey through luminous, authentic, and emotionally charged frames.',
    photos: [
      { src: '/civil_wedding/AJ408720.JPG', caption: 'THE EMBRACE' },
      { src: '/civil_wedding/AJ408736.JPG', caption: 'NEW CHAPTER' },
      { src: '/civil_wedding/AJ408760.JPG', caption: 'SWEET PROMISE' },
      { src: '/civil_wedding/AJ408768.JPG', caption: 'CHAMPAGNE SHOT' }
    ],
    review: {
      text: "A PERFECT STORYTELLING EXPERIENCE. HIGHLY PROFESSIONAL AND OUTSTANDING QUALITY.",
      author: "Sophie & Lucas"
    }
  }
];



export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeProjectPhotos, setActiveProjectPhotos] = useState<ProjectPhoto[]>([]);

  // Scroll animations for each project block
  useGSAP(() => {
    const blocks = gsap.utils.toArray('.project-block');
    blocks.forEach((block: any) => {
      // Fade and slide in text
      gsap.fromTo(block.querySelector('.project-text-side'),
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

  const handlePhotoClick = (src: string, photos: ProjectPhoto[]) => {
    setSelectedPhoto(src);
    setActiveProjectPhotos(photos);
  };

  const closeLightbox = () => {
    gsap.to('.lightbox-overlay', {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        setSelectedPhoto(null);
        setActiveProjectPhotos([]);
      },
    });
  };

  const currentPhotoIndex = selectedPhoto ? activeProjectPhotos.findIndex(p => p.src === selectedPhoto) : -1;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPhotoIndex !== -1 && activeProjectPhotos.length > 0) {
      const prevIdx = (currentPhotoIndex - 1 + activeProjectPhotos.length) % activeProjectPhotos.length;
      setSelectedPhoto(activeProjectPhotos[prevIdx].src);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPhotoIndex !== -1 && activeProjectPhotos.length > 0) {
      const nextIdx = (currentPhotoIndex + 1) % activeProjectPhotos.length;
      setSelectedPhoto(activeProjectPhotos[nextIdx].src);
    }
  };

  return (
    <section id="projects" ref={containerRef} className="projects-section-custom">
      <div className="projects-section-container">
        {PROJECTS_DATA.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={project.id}
              className={`project-block ${isEven ? 'layout-text-left' : 'layout-text-right'}`}
            >
              {/* Text column */}
              <div className="project-text-side">
                <span className="project-number">{project.num}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              {/* Photos collage column */}
              <div className="project-photos-side">
                <div className="project-collage">
                  {project.photos.map((photo, pIdx) => {
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
                        onClick={() => handlePhotoClick(photo.src, project.photos)}
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
                  {/* Client Review Card as 5th element */}
                  <div className="collage-photo photo-center-review review-card">
                    <div className="review-card-content">
                      <span className="quote-mark">“</span>
                      <p className="review-text">{project.review.text}</p>
                      <h5 className="review-author">— {project.review.author}</h5>
                    </div>
                  </div>
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
            <img src={selectedPhoto} alt="Zoomed Project" className="lightbox-img" />
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

