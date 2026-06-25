import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LocationIcon from '../components/LocationIcon'
import PhoneIcon from '../components/PhoneIcon'
import EmailIcon from '../components/EmailIcon'
import { asset } from '../utils/assets'
import './Home.css'

const HERO_SLIDES = [
  { src: asset('hero/hero1.png'), alt: 'OLM international placements' },
  { src: asset('hero/hero2.png'), alt: 'Skilled operators' },
  { src: asset('hero/hero3.png'), alt: 'Welding and trades' },
  { src: asset('hero/hero4.png'), alt: 'Factory and industry' },
  { src: asset('hero/hero5.png'), alt: 'Domestic helpers and caregivers' },
]


const team = [
  { name: 'Expert Consultants', description: 'Trusted since 1992, connecting Filipino workers with overseas employers through decades of industry experience.' },
  { name: 'Global Network', description: 'Fully licensed and compliant with Philippine government regulations for safe and legitimate overseas employment.' },
  { name: 'Personalized Service', description: 'Partnering with reputable employers to provide reliable and rewarding career opportunities abroad.' },
  { name: '24/7 Support', description: 'Guiding applicants every step of the way—from screening and documentation to successful deployment' },
]


const Home = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [heroIndex, setHeroIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const testimonials = [
    {
      name: 'Maria Santos',
      location: 'Taiwan',
      position: 'Software Engineer',
      avatarSrc: asset('about/img1.jpg'),
      quote: 'OLM International helped me find my dream job in Taiwan. Their team was professional, supportive, and made the entire process smooth. I couldn\'t be happier!',
      rating: 5,
    },
    {
      name: 'John Chen',
      location: 'Japan',
      position: 'IT Consultant',
      avatarSrc: asset('about/img2.jpg'),
      quote: 'The best recruitment agency I\'ve worked with. They understood my career goals and matched me with the perfect opportunity in Tokyo. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      location: 'Cyprus',
      position: 'Financial Analyst',
      avatarSrc: asset('about/img3.jpg'),
      quote: 'From application to relocation, OLM International guided me every step of the way. Their expertise in international placements is unmatched.',
      rating: 5,
    },
    {
      name: 'Lisa Wong',
      location: 'Hong Kong',
      position: 'Marketing Manager',
      avatarSrc: asset('about/img5.jpg'),
      quote: 'Professional, efficient, and caring. The team at OLM International truly cares about their clients\' success. Thank you for changing my career!',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      location: 'Japan',
      position: 'Language Instructor',
      avatarSrc: asset('about/img1.jpg'),
      quote: 'The support I received was incredible. OLM International didn\'t just find me a job, they helped me build a new life in Japan. Forever grateful!',
      rating: 5,
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1)
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(testimonials.length / slidesToShow)

  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0)
    }
  }, [totalSlides, currentSlide])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(interval)
  }, [totalSlides, isAutoPlaying])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToSlide = (index) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const getVisibleTestimonials = useMemo(() => {
    const start = currentSlide * slidesToShow
    return testimonials.slice(start, start + slidesToShow)
  }, [currentSlide, slidesToShow])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-carousel" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.img
                key={HERO_SLIDES[heroIndex].src}
                className="hero-carousel__img"
                src={HERO_SLIDES[heroIndex].src}
                alt={HERO_SLIDES[heroIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
          </div>
          <div className="gradient-overlay" />
        </div>

        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            OLM International
            <span className="gradient-text"> Job Placement Corporation</span>
          </motion.h1>
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Connecting talented professionals with exceptional opportunities across Taiwan, Japan, Cyprus, and Hong Kong.
            Your trusted partner in building a successful career abroad.
          </motion.p>
          <motion.div className="hero-buttons" variants={itemVariants}>
            <Link to="/services" className="btn btn-primary">
              Explore Jobs
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get Started
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="team-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose OLM International?
          </motion.h2>
          <div className="team-grid">
            {team.map((item, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Here's What Our Clients Say About Us
          </motion.h2>
          <div className="testimonials-carousel-wrapper">
            <button className="carousel-btn carousel-btn-prev" onClick={prevSlide} aria-label="Previous">
              ‹
            </button>
            <div className="testimonials-carousel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="testimonials-slide"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="testimonials-grid">
                    {getVisibleTestimonials.map((testimonial, index) => (
                      <motion.div
                        key={`${currentSlide}-${index}`}
                        className="testimonial-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      >
                        <div className="testimonial-header">
                          <div className="testimonial-avatar">
                            <img src={testimonial.avatarSrc} alt="" />
                          </div>
                          <div className="testimonial-info">
                            <h4>{testimonial.name}</h4>
                            <p className="testimonial-position">{testimonial.position}</p>
                            <p className="testimonial-location">
                              <LocationIcon className="location-icon" />
                              {testimonial.location}
                            </p>
                          </div>
                        </div>
                        <div className="testimonial-rating">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                        <p className="testimonial-quote">"{testimonial.quote}"</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <button className="carousel-btn carousel-btn-next" onClick={nextSlide} aria-label="Next">
              ›
            </button>
          </div>
          <div className="carousel-dots">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <motion.div
            className="map-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2>Find Us</h2>
            <p>Visit our office or get directions</p>
          </motion.div>
          <motion.div
            className="map-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.4521467894833!2d120.98558887585374!3d14.573292885909792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c980ad782d89%3A0x8ba71635705e26a7!2sOLM%20INTERNATIONAL%20JOB%20PLACEMENT%20CORP!5e0!3m2!1sen!2sph!4v1764532716865!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OLM International Job Placement Corp Location"
              ></iframe>
            </div>
            <div className="map-info">
              <div className="map-info-card">
                <h3>
                  <LocationIcon className="location-icon" />
                  Office Address
                </h3>
                <p>
                  G/F Vermont Tower J. Nakpil St., cor. Vasquez St.<br />
                  Brgy. 696 Malate, Manila
                </p>
              </div>
              <div className="map-info-card">
                <h3>🕒 Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
              </div>
              <div className="map-info-card">
                <h3>
                  <PhoneIcon className="phone-icon" />
                  Contact
                </h3>
                <p>
                  <span className="map-contact-line">
                    <PhoneIcon className="phone-icon" />
                    09175090089
                  </span>
                  <span className="map-contact-line">
                    <EmailIcon className="email-icon" />
                    olm.joc168@gmail.com
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Start Your Journey?</h2>
            <p>Submit your details and let us help you find the perfect opportunity</p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
})

Home.displayName = 'Home'

export default Home

