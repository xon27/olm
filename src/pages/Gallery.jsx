import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { galleryPhotos } from '../data/olmGallery'
import './Gallery.css'

const LazyImage = React.memo(({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = React.useRef(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return (
    <div ref={imgRef} className={className} onClick={onClick} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      {!isLoaded && isInView && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bg-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid var(--primary-color)',
              borderTop: 'none',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }}
          />
        </div>
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const selectedImage = selectedIndex !== null ? galleryPhotos[selectedIndex] : null

  const openImageModal = (image) => {
    const index = galleryPhotos.findIndex((photo) => photo.id === image.id)
    setSelectedIndex(index >= 0 ? index : null)
  }

  const closeImageModal = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const showPreviousImage = useCallback((e) => {
    e?.stopPropagation()
    setSelectedIndex((current) => {
      if (current === null) return null
      return current === 0 ? galleryPhotos.length - 1 : current - 1
    })
  }, [])

  const showNextImage = useCallback((e) => {
    e?.stopPropagation()
    setSelectedIndex((current) => {
      if (current === null) return null
      return current === galleryPhotos.length - 1 ? 0 : current + 1
    })
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeImageModal()
      if (event.key === 'ArrowLeft') showPreviousImage()
      if (event.key === 'ArrowRight') showNextImage()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex, closeImageModal, showPreviousImage, showNextImage])

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <motion.div
            className="gallery-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Gallery</h1>
            <p>Our collection of memories and events are shared here.</p>
          </motion.div>
        </div>
      </section>

      <section className="gallery-content">
        <div className="container">
          <div className="event-photos-grid gallery-all-photos">
            {galleryPhotos.map((photo, photoIndex) => (
              <motion.div
                key={photo.id}
                className="photo-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: Math.min(photoIndex * 0.03, 0.3) }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={() => openImageModal(photo)}
              >
                <LazyImage src={photo.src} alt={photo.alt} className="photo-item-img" />
                <div className="photo-overlay">
                  <svg
                    className="view-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <motion.div
          className="image-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeImageModal}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation()
              closeImageModal()
            }}
            aria-label="Close image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-nav-prev"
            onClick={showPreviousImage}
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} loading="eager" />
            <p className="lightbox-counter">
              {selectedIndex + 1} / {galleryPhotos.length}
            </p>
          </div>

          <button
            type="button"
            className="lightbox-nav lightbox-nav-next"
            onClick={showNextImage}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default Gallery
