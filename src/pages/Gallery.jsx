import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import './Gallery.css'

// Lazy image component with intersection observer
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
            objectFit: 'cover'
          }}
        />
      )}
      {!isLoaded && isInView && (
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'var(--bg-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '20px', height: '20px', border: '2px solid var(--primary-color)', borderTop: 'none', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
        </div>
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  // Gallery data organized by events and years
  const galleryData = [
    {
      year: '2024',
      events: [
        {
          title: 'Christmas Party',
          date: 'December 2024',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_3_BNG-05975-680x460.jpg', alt: 'Liquimar Forum & Christmas Party' },
            { id: 2, src: '/olm/gallery/imgi_4_BNG-05724-680x460.jpg', alt: 'Liquimar Forum & Christmas Party' },
            { id: 3, src: '/olm/gallery/imgi_7_BNG-06066-680x460.jpg', alt: 'Liquimar Forum & Christmas Party' },
          ],
        },
        {
          title: '2024 Forum',
          date: '2024',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_28_BNG2-7867-scaled.jpg', alt: 'Sea Pioneer Forum' },
            { id: 2, src: '/olm/gallery/imgi_29_BNG2-7754-scaled.jpg', alt: 'Sea Pioneer Forum' },
            { id: 3, src: '/olm/gallery/imgi_32_BNG2-7613-scaled.jpg', alt: 'Sea Pioneer Forum' },
            { id: 4, src: '/olm/gallery/imgi_33_BNG2-7653-scaled.jpg', alt: 'Sea Pioneer Forum' },
            { id: 5, src: '/olm/gallery/imgi_34_BNG2-8128-scaled.jpg', alt: 'Sea Pioneer Forum' },
            { id: 6, src: '/olm/gallery/imgi_22_BNG-5-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 7, src: '/olm/gallery/imgi_23_BNG-07182-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 8, src: '/olm/gallery/imgi_24_BNG-07180-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 9, src: '/olm/gallery/imgi_27_BNG-3-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 10, src: '/olm/gallery/imgi_25_BNG-07172-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 11, src: '/olm/gallery/imgi_31_BNG--680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 12, src: '/olm/gallery/imgi_30_BNG-2-680x460.jpg', alt: 'Sea Pioneer Forum' },
          ],
        },
      ],
    },
    {
      year: '2023',
      events: [
        {
          title: 'Christmas Party',
          date: 'November 2023',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_12_BNG-03522-680x460.jpg', alt: 'Andriaki Christmas Party' },
            { id: 2, src: '/olm/gallery/imgi_13_BNG-03515-680x460.jpg', alt: 'Andriaki Christmas Party' },
            { id: 3, src: '/olm/gallery/imgi_19_BNG-03582-680x460.jpg', alt: 'Andriaki Christmas Party' },
          ],
        },
        {
          title: '2023 Visit',
          date: 'April 2023',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_40_received_1642539809492615-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 2, src: '/olm/gallery/imgi_37_received_1621368075007743-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 3, src: '/olm/gallery/imgi_41_received_221794560457951-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 4, src: '/olm/gallery/imgi_39_received_3621823801470708-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 5, src: '/olm/gallery/imgi_42_received_200828129380390-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 6, src: '/olm/gallery/imgi_36_received_752887576486613-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 7, src: '/olm/gallery/imgi_43_received_148707944832335-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 8, src: '/olm/gallery/imgi_44_received_106695439081599-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 9, src: '/olm/gallery/imgi_47_received_255048783565703-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 10, src: '/olm/gallery/imgi_45_received_959301705244687-680x460.jpg', alt: 'Andriaki Visit' },
            { id: 11, src: '/olm/gallery/imgi_46_received_782701056412927-680x460.jpg', alt: 'Andriaki Visit' },
          ],
        },
        {
          title: 'Outreach - Annunciation Of Theotokos',
          date: 'April 2021',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_48_IMG_8673-680x460.jpg', alt: 'Outreach Event' },
            { id: 2, src: '/olm/gallery/imgi_49_IMG_8608-680x460.jpg', alt: 'Outreach Event' },
            { id: 3, src: '/olm/gallery/imgi_50_IMG_8678-680x460.jpg', alt: 'Outreach Event' },
            { id: 4, src: '/olm/gallery/imgi_51_IMG_8599-680x460.jpg', alt: 'Outreach Event' },
            { id: 5, src: '/olm/gallery/imgi_52_IMG_8603-680x460.jpg', alt: 'Outreach Event' },
            { id: 6, src: '/olm/gallery/imgi_53_IMG_8604-680x460.jpg', alt: 'Outreach Event' },
            { id: 7, src: '/olm/gallery/imgi_54_IMG_8605-680x460.jpg', alt: 'Outreach Event' },
            { id: 8, src: '/olm/gallery/imgi_55_IMG_8675-680x460.jpg', alt: 'Outreach Event' },
          ],
        },
      ],
    },
    {
      year: '2019',
      events: [
        {
          title: '2019 Forum',
          date: '2019',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_56_50717473988_53dde8c80b_b-680x460.jpg', alt: 'Andriaki Forum' },
            { id: 2, src: '/olm/gallery/imgi_57_50717474458_c3262f617a_h-1-680x460.jpg', alt: 'Andriaki Forum' },
            { id: 3, src: '/olm/gallery/imgi_58_50718294077_f754d161cf_h-680x460.jpg', alt: 'Andriaki Forum' },
            { id: 4, src: '/olm/gallery/imgi_59_50718293897_5f2b46c3be_h-680x460.jpg', alt: 'Andriaki Forum' },
          ],
        },
        {
          title: 'Florentia Forum',
          date: 'November 2019',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_60_20191209_122558-680x460.jpg', alt: 'Florentia Forum' },
            { id: 2, src: '/olm/gallery/imgi_61_20191209_130137-680x460.jpg', alt: 'Florentia Forum' },
            { id: 3, src: '/olm/gallery/imgi_62_20191209_133004-scaled.jpg', alt: 'Florentia Forum' },
          ],
        },
      ],
    },
    {
      year: '2018',
      events: [
        {
          title: '2018 Forum',
          date: 'June 2018',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_63_28214435477_cb35e63de3_h-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 2, src: '/olm/gallery/imgi_64_28214436447_223fb08df2_h-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 3, src: '/olm/gallery/imgi_65_42178686315_2cdd499747_h-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 4, src: '/olm/gallery/imgi_66_35218273300_f7e26996b7_k-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 5, src: '/olm/gallery/imgi_67_34795923033_ff837eda86_k-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 6, src: '/olm/gallery/imgi_68_35218276520_fdec2b1d18_k-680x460.jpg', alt: 'Sea Pioneer Forum' },
          ],
        },
      ],
    },
    {
      year: '2017',
      events: [
        {
          title: 'Sea Pioneer Forum',
          date: 'June 2017',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_69_DSC09232-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 2, src: '/olm/gallery/imgi_70_DSC09149-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 3, src: '/olm/gallery/imgi_71_DSC09230-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 4, src: '/olm/gallery/imgi_72_DSC09224-680x460.jpg', alt: 'Sea Pioneer Forum' },
            { id: 5, src: '/olm/gallery/imgi_73_DSC09167-680x460.jpg', alt: 'Sea Pioneer Forum' },
          ],
        },
      ],
    },
    {
      year: '2016',
      events: [
        {
          title: 'Outreach - Annunciation Of Theotokos',
          date: 'December 2016',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_74_DSC06166-680x460.jpg', alt: 'Outreach Event' },
            { id: 2, src: '/olm/gallery/imgi_75_DSC06165-680x460.jpg', alt: 'Outreach Event' },
            { id: 3, src: '/olm/gallery/imgi_76_DSC06163-680x460.jpg', alt: 'Outreach Event' },
          ],
        },
      ],
    },
    {
      year: '2015',
      events: [
        {
          title: 'Andriaki Forum',
          date: 'December 2015',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_77_DSC07426-680x460.jpg', alt: 'Andriaki Forum' },
            { id: 2, src: '/olm/gallery/imgi_78_DSC07428-680x460.jpg', alt: 'Andriaki Forum' },
            { id: 3, src: '/olm/gallery/imgi_79_DSC07431-680x460.jpg', alt: 'Andriaki Forum' },
          ],
        },
      ],
    },
    {
      year: '2013',
      events: [
        {
          title: 'Andriaki Forum',
          date: 'December 2013',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_80_DSC02998-680x460.jpg', alt: 'Andriaki Forum' },
            { id: 2, src: '/olm/gallery/imgi_81_DSC02999-680x460.jpg', alt: 'Andriaki Forum' },
            { id: 3, src: '/olm/gallery/imgi_82_DSC03000-680x460.jpg', alt: 'Andriaki Forum' },
            { id: 4, src: '/olm/gallery/imgi_83_DSC02997-680x460.jpg', alt: 'Andriaki Forum' },
          ],
        },
      ],
    },
    {
      year: '2012',
      events: [
        {
          title: 'Militos Forum',
          date: '2012',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_84_34722530854_36da85e32d_b-680x460.jpg', alt: 'Militos Forum' },
            { id: 2, src: '/olm/gallery/imgi_85_35524688416_da1e8d5c66_b-680x460.jpg', alt: 'Militos Forum' },
            { id: 3, src: '/olm/gallery/imgi_86_35524692986_e777f79e0b_b-680x460.jpg', alt: 'Militos Forum' },
          ],
        },
        {
          title: 'Seagull Forum',
          date: '2012',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_87_35524695626_6cd9382c18_b-680x460.jpg', alt: 'Seagull Forum' },
            { id: 2, src: '/olm/gallery/imgi_88_35524692136_ec6b391740_b-680x460.jpg', alt: 'Seagull Forum' },
            { id: 3, src: '/olm/gallery/imgi_89_34722532784_cc3ed045d5_b-1-680x460.jpg', alt: 'Seagull Forum' },
            { id: 4, src: '/olm/gallery/imgi_90_35563370905_0db08567a8_b-1-680x460.jpg', alt: 'Seagull Forum' },
            { id: 5, src: '/olm/gallery/imgi_91_35524698866_3694b64009_b-680x460.jpg', alt: 'Seagull Forum' },
          ],
        },
        {
          title: 'API Christmas Party',
          date: '2012',
          photos: [
            { id: 1, src: '/olm/gallery/imgi_92_35395838152_4443d8c6e5_b-680x460.jpg', alt: 'API Christmas Party' },
            { id: 2, src: '/olm/gallery/imgi_93_35395839972_760f8bb95c_b-680x460.jpg', alt: 'API Christmas Party' },
          ],
        },
      ],
    },
  ]

  const handleViewAll = (event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setSelectedImage(null)
  }

  const openImageModal = (image) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="gallery-page">
      {/* Hero Section */}
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

      {/* Gallery Sections */}
      <section className="gallery-content">
        <div className="container">
          {galleryData.map((yearData, yearIndex) => (
            <div key={yearIndex} className="gallery-year-section">
              <motion.h2
                className="gallery-year"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {yearData.year}
              </motion.h2>

              {yearData.events.map((event, eventIndex) => (
                <motion.div
                  key={eventIndex}
                  className="gallery-event"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: eventIndex * 0.1 }}
                >
                  <div className="event-header">
                    <h3>{event.title}</h3>
                    <span className="event-date">{event.date}</span>
                  </div>

                  <div className="event-photos-grid">
                    {event.photos.slice(0, 9).map((photo, photoIndex) => (
                      <motion.div
                        key={photo.id}
                        className="photo-item"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: photoIndex * 0.05 }}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => openImageModal(photo)}
                      >
                        <LazyImage 
                          src={photo.src} 
                          alt={photo.alt}
                          className="photo-item-img"
                        />
                        <div className="photo-overlay">
                          <svg className="view-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {event.photos.length > 9 && (
                    <div className="view-all-container">
                      <button
                        className="view-all-btn"
                        onClick={() => handleViewAll(event)}
                      >
                        View All Photos
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Full Event Modal */}
      {selectedEvent && (
        <motion.div
          className="event-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{selectedEvent.title}</h2>
            <p className="modal-date">{selectedEvent.date}</p>
            <div className="modal-photos-grid">
              {selectedEvent.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="modal-photo-item"
                  onClick={() => openImageModal(photo)}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <motion.div
          className="image-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeImageModal}
        >
          <button className="lightbox-close" onClick={closeImageModal}>×</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} loading="eager" />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Gallery

