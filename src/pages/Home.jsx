import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Home.css'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
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
      image: '👩‍💼',
      quote: 'OLM International helped me find my dream job in Taiwan. Their team was professional, supportive, and made the entire process smooth. I couldn\'t be happier!',
      rating: 5,
    },
    {
      name: 'John Chen',
      location: 'Japan',
      position: 'IT Consultant',
      image: '👨‍💻',
      quote: 'The best recruitment agency I\'ve worked with. They understood my career goals and matched me with the perfect opportunity in Tokyo. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      location: 'Cyprus',
      position: 'Financial Analyst',
      image: '👩‍💼',
      quote: 'From application to relocation, OLM International guided me every step of the way. Their expertise in international placements is unmatched.',
      rating: 5,
    },
    {
      name: 'David Kim',
      location: 'New Zealand',
      position: 'Healthcare Professional',
      image: '👨‍⚕️',
      quote: 'I was skeptical at first, but OLM International exceeded all my expectations. They found me a position that perfectly matches my skills and lifestyle.',
      rating: 5,
    },
    {
      name: 'Lisa Wong',
      location: 'Hong Kong',
      position: 'Marketing Manager',
      image: '👩‍💼',
      quote: 'Professional, efficient, and caring. The team at OLM International truly cares about their clients\' success. Thank you for changing my career!',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      location: 'Japan',
      position: 'Language Instructor',
      image: '👨‍🏫',
      quote: 'The support I received was incredible. OLM International didn\'t just find me a job, they helped me build a new life in Japan. Forever grateful!',
      rating: 5,
    },
  ]

  const [slidesToShow, setSlidesToShow] = useState(3)

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

  const getVisibleTestimonials = () => {
    const start = currentSlide * slidesToShow
    return testimonials.slice(start, start + slidesToShow)
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-overlay"></div>
          <div className="animated-shapes">
            <motion.div
              className="shape shape-1"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="shape shape-2"
              animate={{
                x: [0, -80, 0],
                y: [0, -60, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="shape shape-3"
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
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
            Connecting talented professionals with exceptional opportunities across Taiwan, Japan, Cyprus, New Zealand, and Hong Kong.
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
      <section className="features">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.div
            className="features-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              <strong>OLM INTERNATIONAL JOB PLACEMENT CORP.</strong> prides itself in the level of skills it has deployed in other countries. These skills include medical staff, professionals, construction workers, mechanical, electrical, factory worker, and domestic helpers, etc. In the case of Hong Kong, Cyprus, Malaysia deployment, which are primarily domestic helpers, the prospective applicants are given seminars and actual on-the-job training to enhance their skills. This usually takes 2-3 week of actual household chores training. For Taiwan primarily caregivers, caretakers and factory workers. Skilled manpower such as heavy equipment operators, mechanics, aircon technicians, pipefitters, welders, electricians and others are properly screened by the company's Professional Consultants before being interviewed by the Principals and undergo trade testing.
            </p>
            <p>
              <strong>OLM INTERNATIONAL JOB PLACEMENT CORP.</strong> also takes pride in the different activities it has undertaken to allow the local Philippine Labor force to find meaningful and properly compensated jobs abroad to enhance their social and economic standing. The company has gone out of its way to recruit manpower in far flung areas of the country, thereby spreading the manpower export not only from Manila but across the nation as well.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <motion.div
            className="news-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Latest News</h2>
            <p>Stay updated with our latest opportunities</p>
          </motion.div>
          <motion.div
            className="news-content-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="news-badge">New Opportunity</div>
            <div className="news-content">
              <div className="news-images-wrapper">
                <div className="news-image-wrapper">
                  <img 
                    src="/news/imgi_32_caring-nurse-providing-compassionate-assistance-to-smiling-elderly-woman-in-a-bright-room.jpg" 
                    alt="Domestic Helper Position in Hong Kong" 
                    className="news-image"
                  />
                </div>
                <div className="news-image-wrapper">
                  <img 
                    src="/news/imgi_35_home-care-for-seniors.jpg" 
                    alt="Domestic Helper Position in Hong Kong" 
                    className="news-image"
                  />
                </div>
              </div>
              <div className="news-text">
                <div className="news-header-inline">
                  <div>
                    <h3>Hiring: Domestic Helper Positions in Hong Kong</h3>
                    <p className="news-date">Posted: January 2025</p>
                  </div>
                </div>
                <p className="news-description">
                  We are currently accepting applications for domestic helper positions in Hong Kong. 
                  This is an excellent opportunity for individuals seeking employment abroad with competitive 
                  salary packages, comprehensive benefits, and a supportive work environment. 
                  Successful candidates will work with reputable employers in Hong Kong and receive full 
                  assistance with visa processing and relocation.
                </p>
                <div className="news-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Competitive salary package</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Full visa and work permit assistance</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Accommodation provided</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">✓</span>
                    <span>Medical insurance coverage</span>
                  </div>
                </div>
                <Link to="/services" className="news-btn">
                  View Details & Apply
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                    {getVisibleTestimonials().map((testimonial, index) => (
                      <motion.div
                        key={`${currentSlide}-${index}`}
                        className="testimonial-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      >
                        <div className="testimonial-header">
                          <div className="testimonial-avatar">{testimonial.image}</div>
                          <div className="testimonial-info">
                            <h4>{testimonial.name}</h4>
                            <p className="testimonial-position">{testimonial.position}</p>
                            <p className="testimonial-location">📍 {testimonial.location}</p>
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
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Find Us</h2>
            <p>Visit our office or get directions</p>
          </motion.div>
          <motion.div
            className="map-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                <h3>📍 Office Address</h3>
                <p>123 Business Street<br />Global City, 12345<br />United States</p>
              </div>
              <div className="map-info-card">
                <h3>🕒 Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
              </div>
              <div className="map-info-card">
                <h3>📞 Contact</h3>
                <p>Phone: +1 (555) 123-4567<br />Email: info@globalrecruit.com</p>
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
            viewport={{ once: true }}
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
}

export default Home

