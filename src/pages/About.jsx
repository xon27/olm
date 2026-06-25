import React from 'react'
import { motion } from 'framer-motion'
import BranchesGrid from '../components/BranchesGrid'
import { asset } from '../utils/assets'
import './About.css'

const About = () => {
  const stats = [
    { number: '10K+', label: 'Successful Placements' },
    { number: '50+', label: 'Partner Companies' },
    { number: '7', label: 'Countries' },
    { number: '98%', label: 'Client Satisfaction' },
  ]

  const values = [
    {
      imageSrc: asset('about/mission.png'),
      title: 'Our Mission',
      description: 'To provide ethical, efficient, and high-quality recruitment services by connecting qualified Filipino workers with reputable international employers. We are committed to empowering individuals through meaningful overseas employment opportunities while ensuring professionalism, integrity, and compliance with industry standards. Through dedicated support and responsible recruitment practices, we strive to contribute to the growth and success of both our workers and employer partners..',
    },
    {
      imageSrc: asset('about/vision.png'),
      title: 'Our Vision',
      description: 'To be a leading and trusted international recruitment agency recognized for excellence, integrity, and commitment to the welfare of Filipino workers. We envision a future where every qualified Filipino has access to legitimate global employment opportunities, enabling them to achieve personal growth, financial stability, and a better quality of life for themselves and their families.',
    },
    
    
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
              OLM International Job Placement Corporation (OLM International) is a Philippine-based recruitment agency established in 1992. The company is duly registered with the Securities and Exchange Commission (SEC) and licensed by the Department of Migrant Workers (DMW) under License No. DMW-086-LB-081722-R.
              </p>
              <p>
                For more than three decades, OLM International has been committed to connecting qualified Filipino workers with reputable employers abroad, providing overseas employment opportunities that promote professional growth, financial stability, and improved quality of life.
              </p>
              <p>
              Currently, OLM International facilitates the deployment of Filipino workers to Hong Kong, Cyprus, Malaysia, Japan, Taiwan, Greece, and Brazil. The agency specializes in the recruitment and placement of Domestic Helpers for Hong Kong, Cyprus, Malaysia, Greece, and Brazil; Welders for Japan; and Factory Workers and Caretakers for Taiwan.
              </p>
              <p>
              Throughout its years of operation, OLM International has successfully deployed skilled, semi-skilled, and professional workers across various industries worldwide. This extensive experience has enabled the company to develop a thorough recruitment and screening process that ensures candidates meet both employer requirements and international employment standards.
              </p>
              <p>
              To maintain the quality of its workforce, OLM International provides comprehensive applicant screening, orientation, and preparation programs. Candidates undergo interviews, skills assessments, and job-specific evaluations to ensure they are well-equipped for their overseas employment. For domestic worker applicants, additional training and orientation are provided to enhance their skills, professionalism, and readiness for international placement.
              </p>
              <p>
              OLM International takes pride in its role in creating opportunities for Filipino workers from all regions of the country. Through continuous recruitment efforts nationwide, the company helps aspiring overseas workers access legitimate employment opportunities while supporting the global demand for skilled and dedicated Filipino talent.
              </p>
              <p>
              Guided by professionalism, integrity, and excellence in service, OLM International remains committed to being a trusted partner of both employers and Filipino workers in building successful careers abroad.
              </p>
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
                <div className="value-icon">
                  <img src={value.imageSrc} alt="" width={96} height={96} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
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
          <BranchesGrid />
        </div>
      </section>
    </div>
  )
}

export default About

