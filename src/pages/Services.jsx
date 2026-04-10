import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Services.css'

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [jobSlides, setJobSlides] = useState({})

  const countries = [
    {
      name: 'Taiwan',
      image: '/olm/Taiwan.jpg',
      description: 'Explore exciting career opportunities in Taiwan, known for its thriving technology and manufacturing sectors.',
      jobs: [
        { title: 'Software Engineer', company: 'Tech Corp', location: 'Taipei', type: 'Full-time' },
        { title: 'Manufacturing Supervisor', company: 'Industrial Solutions', location: 'Kaohsiung', type: 'Full-time' },
        { title: 'English Teacher', company: 'Education Plus', location: 'Taichung', type: 'Part-time' },
        { title: 'Data Analyst', company: 'Digital Innovations', location: 'Taipei', type: 'Full-time' },
        { title: 'Project Manager', company: 'Global Tech Solutions', location: 'Hsinchu', type: 'Full-time' },
      ],
    },
    {
      name: 'Japan',
      image: '/olm/Japan.jpg',
      description: 'Discover diverse job opportunities in Japan, from technology to hospitality and education.',
      jobs: [
        { title: 'IT Consultant', company: 'Digital Solutions', location: 'Tokyo', type: 'Full-time' },
        { title: 'Hotel Manager', company: 'Hospitality Group', location: 'Osaka', type: 'Full-time' },
        { title: 'Language Instructor', company: 'Global Education', location: 'Kyoto', type: 'Contract' },
      ],
    },
    {
      name: 'Cyprus',
      image: '/olm/Cyprus.jpg',
      description: 'Find your dream job in Cyprus, a beautiful Mediterranean island with growing business opportunities.',
      jobs: [
        { title: 'Financial Analyst', company: 'Finance Hub', location: 'Nicosia', type: 'Full-time' },
        { title: 'Tourism Coordinator', company: 'Travel Agency', location: 'Limassol', type: 'Full-time' },
        { title: 'Real Estate Agent', company: 'Property Group', location: 'Paphos', type: 'Full-time' },
      ],
    },
    {
      name: 'New Zealand',
      image: '/olm/NewZealand.jpg',
      description: 'Experience work-life balance in New Zealand with opportunities across various industries.',
      jobs: [
        { title: 'Healthcare Professional', company: 'Health Services', location: 'Auckland', type: 'Full-time' },
        { title: 'Agricultural Specialist', company: 'Farm Solutions', location: 'Christchurch', type: 'Full-time' },
        { title: 'Construction Manager', company: 'Build Corp', location: 'Wellington', type: 'Full-time' },
      ],
    },
    {
      name: 'Hong Kong',
      image: '/olm/Hongkong.jpg',
      description: 'Join the dynamic workforce in Hong Kong, a global financial hub with endless possibilities.',
      jobs: [
        { title: 'Investment Banker', company: 'Finance Group', location: 'Central', type: 'Full-time' },
        { title: 'Marketing Manager', company: 'Brand Agency', location: 'Causeway Bay', type: 'Full-time' },
        { title: 'Legal Advisor', company: 'Law Firm', location: 'Admiralty', type: 'Full-time' },
      ],
    },
  ]

  const toggleCountry = (index) => {
    setSelectedCountry(selectedCountry === index ? null : index)
    // Initialize slide state for this country when expanding
    if (selectedCountry !== index) {
      setJobSlides((prev) => ({
        ...prev,
        [index]: prev[index] !== undefined ? prev[index] : 0,
      }))
    }
  }

  const jobsPerSlide = 3
  const getTotalSlides = (jobs) => Math.ceil(jobs.length / jobsPerSlide)

  const getVisibleJobs = (jobs, countryIndex) => {
    const currentSlide = jobSlides[countryIndex] || 0
    const start = currentSlide * jobsPerSlide
    return jobs.slice(start, start + jobsPerSlide)
  }

  const nextJobSlide = (e, countryIndex, totalSlides) => {
    e.preventDefault()
    e.stopPropagation()
    setJobSlides((prev) => {
      const currentSlide = prev[countryIndex] || 0
      const nextSlide = (currentSlide + 1) % totalSlides
      return {
        ...prev,
        [countryIndex]: nextSlide,
      }
    })
  }

  const prevJobSlide = (e, countryIndex, totalSlides) => {
    e.preventDefault()
    e.stopPropagation()
    setJobSlides((prev) => {
      const currentSlide = prev[countryIndex] || 0
      const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides
      return {
        ...prev,
        [countryIndex]: prevSlide,
      }
    })
  }

  const goToJobSlide = (e, countryIndex, slideIndex) => {
    e.preventDefault()
    e.stopPropagation()
    setJobSlides((prev) => ({ ...prev, [countryIndex]: slideIndex }))
  }

  //// Auto-slide removed - manual navigation only
 
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <motion.div
            className="services-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <h1>Job Vacancies</h1>
            <p>Explore opportunities across the globe</p>
          </motion.div>
        </div>
      </section>

      <section className="countries-section">
        <div className="container">
          <div className="countries-grid">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                className={`country-card ${selectedCountry === index ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.4, 0, 0.2, 1]
                }}
                onClick={() => toggleCountry(index)}
              >
                <div className="country-image-wrapper">
                  <img src={country.image} alt={country.name} className="country-image" />
                  <div className="country-overlay"></div>
                </div>
                <div className="country-header">
                  <h2>{country.name}</h2>
                  <span 
                    className={`expand-icon ${selectedCountry === index ? 'expanded' : ''}`}
                  >
                    <span className="icon-line icon-line-horizontal"></span>
                    <span className="icon-line icon-line-vertical"></span>
                  </span>
                </div>
                <p className="country-description">{country.description}</p>
                
                {selectedCountry === index && (
                  <motion.div
                    className="jobs-list"
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                      opacity: { duration: 0.4 },
                      height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                      y: { duration: 0.4 }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3>💼 Available Positions</h3>
                    {country.jobs.length > jobsPerSlide ? (
                      <div className="jobs-carousel-wrapper" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="job-carousel-btn job-carousel-btn-prev"
                          onClick={(e) => prevJobSlide(e, index, getTotalSlides(country.jobs))}
                          aria-label="Previous jobs"
                        >
                          ‹
                        </button>
                        <div className="jobs-carousel">
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                              key={`${index}-${jobSlides[index] || 0}`}
                              className="jobs-slide"
                              initial={{ opacity: 0, x: 30, scale: 0.95 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: -30, scale: 0.95 }}
                              transition={{ 
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1],
                                opacity: { duration: 0.3 },
                                scale: { duration: 0.4 }
                              }}
                            >
                              <div className="jobs-grid">
                                {getVisibleJobs(country.jobs, index).map((job, jobIndex) => (
                                  <div
                                    key={`${index}-${jobSlides[index] || 0}-${jobIndex}-${job.title}`}
                                    className="job-card"
                                  >
                                    <div className="job-header">
                                      <h4>{job.title}</h4>
                                    </div>
                                    <div className="job-details">
                                      <p className="job-company">{job.company}</p>
                                      <p className="job-location">{job.location}</p>
                                    </div>
                                    <Link 
                                      to="/apply" 
                                      state={{ jobTitle: job.title, company: job.company, location: job.location }}
                                      className="job-type job-apply-btn"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      Apply Now
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <button
                          type="button"
                          className="job-carousel-btn job-carousel-btn-next"
                          onClick={(e) => nextJobSlide(e, index, getTotalSlides(country.jobs))}
                          aria-label="Next jobs"
                        >
                          ›
                        </button>
                      </div>
                    ) : (
                      <div className="jobs-grid">
                        {country.jobs.map((job, jobIndex) => (
                          <motion.div
                            key={jobIndex}
                            className="job-card"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                              delay: jobIndex * 0.08,
                              duration: 0.4,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          >
                            <div className="job-header">
                              <h4>{job.title}</h4>
                            </div>
                            <div className="job-details">
                              <p className="job-company">{job.company}</p>
                              <p className="job-location">{job.location}</p>
                            </div>
                            <Link 
                              to="/apply" 
                              state={{ jobTitle: job.title, company: job.company, location: job.location }}
                              className="job-type job-apply-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Apply Now
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {country.jobs.length > jobsPerSlide && (
                      <div className="job-carousel-dots" onClick={(e) => e.stopPropagation()}>
                        {[...Array(getTotalSlides(country.jobs))].map((_, slideIndex) => (
                          <button
                            key={slideIndex}
                            type="button"
                            className={`job-carousel-dot ${(jobSlides[index] || 0) === slideIndex ? 'active' : ''}`}
                            onClick={(e) => goToJobSlide(e, index, slideIndex)}
                            aria-label={`Go to slide ${slideIndex + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="apply-cta">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <h2>Interested in Any Position?</h2>
            <p>Submit your application and resume to get started</p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services

