import React from 'react'
import { motion } from 'framer-motion'
import LocationIcon from './LocationIcon'
import { branches } from '../data/branches'
import './BranchesGrid.css'

const BranchesGrid = ({ className = '' }) => {
  return (
    <div className={`branches-grid ${className}`.trim()}>
      {branches.map((branch, index) => (
        <motion.div
          key={branch.city}
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
              title={`${branch.city} — ${branch.mapLabel ?? branch.city}`}
            />
          </div>
          <div className="branch-content">
            <h3>{branch.city}</h3>
            <div className="branch-details">
              <p className="branch-address">
                <LocationIcon className="location-icon" />
                {branch.address}
              </p>
              {branch.mapsLink && (
                <a
                  href={branch.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="branch-maps-link"
                >
                  View on Google Maps
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default BranchesGrid
