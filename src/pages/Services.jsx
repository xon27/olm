import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import LocationIcon from '../components/LocationIcon'
import { asset } from '../utils/assets'
import './Services.css'

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [jobSlides, setJobSlides] = useState({})

  const countries = [
    {
      name: 'Hong Kong',
      image: asset('Hongkong.jpg'),
      description: 'Deployment opportunities for Filipino domestic helpers with reputable employers in Hong Kong.',
      jobs: [
        { title: 'Domestic Helper', company: 'Licensed Overseas Employer', location: 'Hong Kong', type: 'Full-time' },
      ],
    },
    {
      name: 'Cyprus',
      image: asset('Cyprus.jpg'),
      description: 'Legitimate domestic helper placements in Cyprus through OLM International\'s licensed recruitment process.',
      jobs: [
        { title: 'Domestic Helper', company: 'Licensed Overseas Employer', location: 'Cyprus', type: 'Full-time' },
      ],
    },
    {
      name: 'Malaysia',
      image: asset('Hongkong.jpg'),
      description: 'Overseas employment opportunities for domestic helpers seeking work in Malaysia.',
      jobs: [
        { title: 'Domestic Helper', company: 'Licensed Overseas Employer', location: 'Malaysia', type: 'Full-time' },
      ],
    },
    {
      name: 'Japan',
      image: asset('Japan.jpg'),
      description: 'Skilled deployment for welders with trade testing and screening through OLM International.',
      jobs: [
        { title: 'Welder', company: 'Licensed Overseas Employer', location: 'Japan', type: 'Full-time' },
      ],
    },
    {
      name: 'Taiwan',
      image: asset('Taiwan.jpg'),
      description: 'Recruitment and placement for caretakers and factory workers bound for Taiwan.',
      jobs: [
        { title: 'Caretaker', company: 'Licensed Overseas Employer', location: 'Taiwan', type: 'Full-time' },
        { title: 'Factory Worker', company: 'Licensed Overseas Employer', location: 'Taiwan', type: 'Full-time' },
      ],
    },
    {
      name: 'Greece',
      image: asset('Greece.png'),
      description: 'Domestic helper opportunities in Greece for qualified and properly screened applicants.',
      jobs: [
        { title: 'Domestic Helper', company: 'Licensed Overseas Employer', location: 'Greece', type: 'Full-time' },
      ],
    },
    {
      name: 'Brazil',
      image: asset('Brazil.png'),
      description: 'Overseas deployment for domestic helpers with licensed employers in Brazil.',
      jobs: [
        { title: 'Domestic Helper', company: 'Licensed Overseas Employer', location: 'Brazil', type: 'Full-time' },
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
                  <button
                    type="button"
                    className={`country-apply-btn ${selectedCountry === index ? 'expanded' : ''}`}
                    aria-expanded={selectedCountry === index}
                    aria-label={
                      selectedCountry === index
                        ? `Close ${country.name} job listings`
                        : `View job vacancies in ${country.name}`
                    }
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCountry(index)
                    }}
                  >
                    <span className="country-apply-btn__text">
                      {selectedCountry === index ? 'Close' : 'Apply Now'}
                    </span>
                    <span className="country-apply-btn__arrow" aria-hidden="true">→</span>
                  </button>
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
                                      <p className="job-location">
                                        <LocationIcon className="location-icon" />
                                        {job.location}
                                      </p>
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
                              <p className="job-location">
                                <LocationIcon className="location-icon" />
                                {job.location}
                              </p>
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

