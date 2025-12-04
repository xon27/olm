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
    documents: [],
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e, field) => {
    if (field === 'resume') {
      setFormData({ ...formData, resume: e.target.files[0] })
    } else if (field === 'documents') {
      setFormData({ ...formData, documents: Array.from(e.target.files) })
    }
  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Create FormData for file uploads
      const formDataToSend = new FormData()
      formDataToSend.append('firstName', formData.firstName)
      formDataToSend.append('lastName', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('jobTitle', jobTitle)
      formDataToSend.append('company', company || 'N/A')
      formDataToSend.append('location', locationName || 'N/A')
      formDataToSend.append('message', formData.message || 'No message provided')
      formDataToSend.append('_to', 'dixoncarnacete13@gmail.com')
      formDataToSend.append('_subject', `Job Application: ${jobTitle}`)
      
      // Add resume if exists
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume)
      }
      
      // Add additional documents
      if (formData.documents && formData.documents.length > 0) {
        formData.documents.forEach((doc, index) => {
          formDataToSend.append(`document_${index}`, doc)
        })
      }

      // Using Formspree - Replace with your Formspree endpoint
      // Get free endpoint at https://formspree.io/
      const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'
      
      // Alternative: Use EmailJS if configured
      const useEmailJS = false // Set to true and configure EmailJS below
      
      if (useEmailJS) {
        // EmailJS implementation (requires setup)
        const emailjs = await import('@emailjs/browser')
        const serviceId = 'YOUR_SERVICE_ID'
        const templateId = 'YOUR_TEMPLATE_ID'
        const publicKey = 'YOUR_PUBLIC_KEY'
        
        // Convert files to base64 for EmailJS
        let resumeBase64 = ''
        if (formData.resume) {
          resumeBase64 = await convertFileToBase64(formData.resume)
        }
        
        const templateParams = {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          job_title: jobTitle,
          company: company || 'N/A',
          location: locationName || 'N/A',
          message: formData.message || 'No message provided',
          resume_file_name: formData.resume ? formData.resume.name : '',
          resume_file: resumeBase64,
          to_email: 'dixoncarnacete13@gmail.com',
        }
        
        await emailjs.default.send(serviceId, templateId, templateParams, publicKey)
      } else {
        // Using Formspree (works immediately)
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          body: formDataToSend,
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to submit application')
        }
      }
      
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        resume: null,
        documents: [],
        message: '',
      })
      
      // Reset file inputs
      const resumeInput = document.getElementById('resume')
      const documentsInput = document.getElementById('documents')
      if (resumeInput) resumeInput.value = ''
      if (documentsInput) documentsInput.value = ''

      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting application:', error)
      setIsSubmitting(false)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
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
                      onChange={(e) => handleFileChange(e, 'resume')}
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
                  <label htmlFor="documents">Additional Documents</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="documents"
                      name="documents"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange(e, 'documents')}
                      className="file-input"
                    />
                    <label htmlFor="documents" className="file-label">
                      {formData.documents.length > 0
                        ? `${formData.documents.length} file(s) selected`
                        : 'Choose files (PDF, DOC, DOCX, JPG, PNG)'}
                    </label>
                  </div>
                  <small>You can upload multiple files. Maximum file size: 5MB each</small>
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
                    ✗ Sorry, there was an error submitting your application. Please try again.
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

