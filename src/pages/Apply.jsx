import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import './Apply.css'

const Apply = () => {
  const location = useLocation()
  const jobTitle = location.state?.jobTitle || 'Position'
  const company = location.state?.company || ''
  const locationName = location.state?.location || ''

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      // Formspree - Free plan doesn't support file uploads, so we convert to base64
      // Get free form endpoint from: https://formspree.io
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_APPLY_ENDPOINT || 'https://formspree.io/f/xrbnlndg'

      // Create FormData
      const formDataToSend = new FormData()
      
      // Form fields
      formDataToSend.append('firstName', formData.firstName)
      formDataToSend.append('lastName', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('jobTitle', jobTitle)
      formDataToSend.append('company', company || 'N/A')
      formDataToSend.append('location', locationName || 'N/A')
      formDataToSend.append('message', formData.message || 'No message provided')
      
      // Set recipient email (works on free plan)
      formDataToSend.append('_to', 'dixoncarnacete13@gmail.com')
      formDataToSend.append('_subject', `Job Application: ${jobTitle}`)
      
      // Upload file to free file hosting service and get download link
      let resumeDownloadLink = ''
      if (formData.resume) {
        try {
          // Check file size (limit to 5MB for free services)
          if (formData.resume.size > 5 * 1024 * 1024) {
            throw new Error('File size must be less than 5MB. Please compress your resume.')
          }

          // Upload file to 0x0.st (free file hosting service)
          const fileFormData = new FormData()
          fileFormData.append('file', formData.resume)
          
          const uploadResponse = await fetch('https://0x0.st', {
            method: 'POST',
            body: fileFormData
          })

          if (uploadResponse.ok) {
            resumeDownloadLink = await uploadResponse.text()
            resumeDownloadLink = resumeDownloadLink.trim() // Remove any whitespace
            
            const fileSizeKB = (formData.resume.size / 1024).toFixed(2)
            formDataToSend.append('resume_file_name', formData.resume.name)
            formDataToSend.append('resume_file_size', `${fileSizeKB} KB`)
            formDataToSend.append('resume_download_link', resumeDownloadLink)
            formDataToSend.append('resume_note', `Resume file uploaded successfully! Download link: ${resumeDownloadLink}`)
          } else {
            // If upload fails, include file info as fallback
            const fileSizeKB = (formData.resume.size / 1024).toFixed(2)
            formDataToSend.append('resume_file_name', formData.resume.name)
            formDataToSend.append('resume_file_size', `${fileSizeKB} KB`)
            formDataToSend.append('resume_note', `Resume file: ${formData.resume.name} (${fileSizeKB} KB). File upload failed - please contact ${formData.email} to request the resume.`)
          }
        } catch (uploadError) {
          console.error('File upload error:', uploadError)
          // Include file info as fallback
          const fileSizeKB = (formData.resume.size / 1024).toFixed(2)
          formDataToSend.append('resume_file_name', formData.resume.name)
          formDataToSend.append('resume_file_size', `${fileSizeKB} KB`)
          formDataToSend.append('resume_note', `Resume file: ${formData.resume.name} (${fileSizeKB} KB). Please contact ${formData.email} to request the resume file.`)
        }
      }

      // Send application using Formspree
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }
      
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        resume: null,
        message: '',
      })
      
      // Reset file input
      const resumeInput = document.getElementById('resume')
      if (resumeInput) resumeInput.value = ''

      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting application:', error)
      setIsSubmitting(false)
      setSubmitStatus('error')
      
      // Set user-friendly error message
      let userMessage = 'Sorry, there was an error submitting your application. Please try again.'
      if (error.message) {
        userMessage = `Error: ${error.message}`
      }
      
      setErrorMessage(userMessage)
      
      setTimeout(() => {
        setSubmitStatus(null)
        setErrorMessage('')
      }, 8000)
    }
  }

  return (
    <div className="apply-page">
      <section className="apply-hero">
        <div className="container">
          <motion.div
            className="apply-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Job Application</h1>
            <p>Apply for {jobTitle}{company ? ` at ${company}` : ''}{locationName ? ` in ${locationName}` : ''}</p>
          </motion.div>
        </div>
      </section>

      <section className="apply-content">
        <div className="container">
          <div className="apply-wrapper">
            <motion.div
              className="apply-form-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form className="apply-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="resume">Resume/CV *</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="file-input"
                    />
                    <label htmlFor="resume" className="file-label">
                      {formData.resume ? formData.resume.name : 'Choose file (PDF, DOC, DOCX)'}
                    </label>
                  </div>
                  <small>Maximum file size: 5MB</small>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us about yourself or any questions you have..."
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Thank you! Your application has been submitted successfully.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✗ {errorMessage || 'Sorry, there was an error submitting your application. Please try again.'}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Apply

