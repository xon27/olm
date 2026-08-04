import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LocationIcon from '../components/LocationIcon'
import { asset } from '../utils/assets'
import './Home.css'

const HERO_SLIDES = [
  { src: asset('hero/hero1.png'), alt: 'OLM international placements' },
  { src: asset('hero/hero2.png'), alt: 'Skilled operators' },
  { src: asset('hero/hero3.png'), alt: 'Welding and trades' },
  { src: asset('hero/hero4.png'), alt: 'Factory and industry' },
  { src: asset('hero/hero5.png'), alt: 'Domestic helpers and caregivers' },
]

const HERO_FADE = {
  opacity: { duration: 0.9, ease: [0.45, 0, 0.55, 1] },
}

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

const team = [
  { name: '30+ Years of Recruitment Excellence', description: 'Trusted since 1992, connecting Filipino workers with overseas employers through decades of industry experience.' },
  { name: 'DMW-Licensed and Trusted Agency', description: 'Fully licensed and compliant with Philippine government regulations for safe and legitimate overseas employment.' },
  { name: 'Quality Overseas Job Opportunities', description: 'Partnering with reputable employers to provide reliable and rewarding career opportunities abroad.' },
  { name: 'Professional Support from Application to Deployment', description: 'Guiding applicants every step of the way—from screening and documentation to successful deployment' },
]

const destinations = [
  { name: 'Hong Kong', region: 'Asia', focus: 'Domestic Helper', image: asset('Hongkong.jpg') },
  { name: 'Cyprus', region: 'Europe', focus: 'Domestic & Skilled', image: asset('Cyprus.jpg') },
  { name: 'Malaysia', region: 'Asia', focus: 'Domestic Helper', image: asset('Malaysia.jpg') },
  { name: 'Japan', region: 'Asia', focus: 'Welder', image: asset('Japan.jpg') },
  { name: 'Taiwan', region: 'Asia', focus: 'Caretaker & Factory', image: asset('Taiwan.jpg') },
  { name: 'Greece', region: 'Europe', focus: 'Domestic & Skilled', image: asset('Greece.png') },
  { name: 'Brazil', region: 'South America', focus: 'Domestic Helper', image: asset('Brazil.png') },
]

const purposeItems = [
  {
    id: '01',
    title: 'Our Mission',
    description:
      'To provide ethical, efficient, and high-quality recruitment services by connecting qualified Filipino workers with reputable international employers. We are committed to empowering individuals through meaningful overseas employment opportunities while ensuring professionalism, integrity, and compliance with industry standards.',
  },
  {
    id: '02',
    title: 'Our Vision',
    description:
      'To be a leading and trusted international recruitment agency recognized for excellence, integrity, and commitment to the welfare of Filipino workers—where every qualified Filipino has access to legitimate global employment opportunities.',
  },
  {
    id: '03',
    title: 'Our Values',
    description:
      'We uphold integrity, professionalism, and excellence in every placement. Guided by responsible recruitment practices, we put the welfare of Filipino workers and the trust of our employer partners at the center of everything we do.',
  },
]


const Home = React.memo(() => {
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-carousel" aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.img
                key={HERO_SLIDES[heroIndex].src}
                className="hero-carousel__img"
                src={HERO_SLIDES[heroIndex].src}
                alt={HERO_SLIDES[heroIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={HERO_FADE}
              />
            </AnimatePresence>
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
            Connecting talented professionals with exceptional opportunities across Hong Kong, Cyprus, Malaysia, Japan, Taiwan, Greece, and Brazil.
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

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="team-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose OLM International?
          </motion.h2>
          <div className="team-grid">
            {team.map((item, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="destinations-section">
        <div className="destinations-atmosphere" aria-hidden="true" />
        <div className="container">
          <motion.div
            className="destinations-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="destinations-title">Countries We Connect You To</h2>
            <p className="destinations-subtitle">
              Trusted placement pathways across Asia, Europe, and South America.
            </p>
          </motion.div>

          <div className="destinations-grid">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                className={`destination-panel ${index === 0 ? 'destination-panel--featured' : ''}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
              >
                <Link to="/services" className="destination-panel__link" aria-label={`View jobs in ${destination.name}`}>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="destination-panel__image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="destination-panel__veil" />
                  <div className="destination-panel__content">
                    <span className="destination-panel__region">{destination.region}</span>
                    <h3 className="destination-panel__name">{destination.name}</h3>
                    <span className="destination-panel__focus">{destination.focus}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="destinations-cta"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link to="/services" className="destinations-cta__link">
              Explore Job Vacancies
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="purpose-section">
        <div className="container">
          <motion.div
            className="purpose-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="purpose-title">Mission, Vision & Values</h2>
            <p className="purpose-subtitle">
              The principles that guide every placement and partnership.
            </p>
          </motion.div>

          <div className="purpose-grid">
            {purposeItems.map((item, index) => (
              <motion.article
                key={item.id}
                className="purpose-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.24) }}
              >
                <span className="purpose-item__index" aria-hidden="true">{item.id}</span>
                <h3 className="purpose-item__title">{item.title}</h3>
                <p className="purpose-item__text">{item.description}</p>
              </motion.article>
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
            transition={{ duration: 0.6, delay: 0.15 }}
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
                <p>
                  Monday to Friday: 9:00am - 5:00pm<br />
                  Saturday and Sunday: Closed
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
