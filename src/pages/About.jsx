import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const stats = [
    { number: '10K+', label: 'Successful Placements' },
    { number: '50+', label: 'Partner Companies' },
    { number: '5', label: 'Countries' },
    { number: '98%', label: 'Client Satisfaction' },
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Our Mission',
      description: 'To connect talented individuals with exceptional opportunities worldwide, fostering career growth and personal development.',
    },
    {
      icon: '👁️',
      title: 'Our Vision',
      description: 'To be the leading global recruitment platform, recognized for excellence, integrity, and transformative career solutions.',
    },
    {
      icon: '💎',
      title: 'Our Values',
      description: 'We are committed to transparency, professionalism, and building lasting relationships with both candidates and employers.',
    },
  ]

  const team = [
    { name: 'Expert Consultants', description: 'Our team of experienced recruitment specialists' },
    { name: 'Global Network', description: 'Extensive connections across multiple countries' },
    { name: 'Personalized Service', description: 'Tailored approach for each candidate' },
    { name: '24/7 Support', description: 'Round-the-clock assistance when you need it' },
  ]

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>About Us</h1>
            <p className="hero-subtitle">
              Your trusted partner in global career opportunities
            </p>
          </motion.div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <motion.div
              className="story-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Our Story</h2>
              <p>
                At the helm of the Company is <strong>Mrs. Relinda Roxas Malanum</strong>. She has been in the service bureau for over 25-year from 1992 up to present. In support to her operation, her husband <strong>Mr. Rafael C. Malanum</strong> has been actively participating in the background and has delegated the day-to-day operations.
              </p>
              <p>
                <strong>Mr. Rafael C. Malanum</strong> has had his own experiences overseas having worked in Saudi Arabia for over 6-year and thus quite aware of the plight of the local expatriates in overseas countries.
              </p>
              <p>
                The company has 7 professional staff on it's main office that attend to the day-to-day requirements such as screening, travel bookings, passport facilitations, government liaison, accounting, etc. In addition to this, it has a complement of professional consultants in the different categories of manpower.
              </p>
            </motion.div>
            <motion.div
              className="story-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="image-placeholder">
                <span>👥</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Mission, Vision & Values
          </motion.h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Work With Us
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

      <section className="branches-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Branches
          </motion.h2>
          <p className="branches-subtitle">
            Our branch offices in the Philippines
          </p>
          <div className="branches-grid">
            {[
              {
                city: 'Baguio City',
                address: '2nd Floor Totanes Building, Km 3 La Trinidad Benguet',
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.5!2d120.5833!3d16.4023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDI0JzA4LjMiTiAxMjDCsDM0JzU5LjkiRQ!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph&q=Totanes+Building+Km+3+La+Trinidad+Benguet',
              },
              {
                city: 'Iloilo City',
                address: '2nd Floor Sta Cruz Building Ledesma Street cor. Fuentes Street Iloilo City',
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.5!2d122.5667!3d10.7200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQzJzEyLjAiTiAxMjLCsDM0JzAwLjEiRQ!5e0!3m2!1sen!2sph!4v1234567890124!5m2!1sen!2sph&q=Sta+Cruz+Building+Ledesma+Street+Fuentes+Street+Iloilo+City',
              },
            ].map((branch, index) => (
              <motion.div
                key={index}
                className="branch-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="branch-map">
                  <iframe
                    src={branch.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${branch.city} Location`}
                  ></iframe>
                </div>
                <div className="branch-content">
                  <h3>{branch.city}</h3>
                  <div className="branch-details">
                    <p className="branch-address">📍 {branch.address}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

