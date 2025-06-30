import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Star, Shield, Clock, Users, Calendar, Tag, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Place {
  id: number
  name: string
  category: string
  location: string
  rating: number
  safetyScore: number
  image: string
  tags: string[]
  lastUpdated: string
  coordinates: [number, number]
  description?: string
  hours?: string
  totalReviews?: number
  author?: string
  created_at?: string
  review?: string
}

interface PlaceCardModalProps {
  place: Place | null
  isOpen: boolean
  onClose: () => void
}

const PlaceCardModal: React.FC<PlaceCardModalProps> = ({ place, isOpen, onClose }) => {
  if (!place) return null

  const getSafetyColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-100'
    if (score >= 7) return 'text-green-600 bg-green-100'
    if (score >= 5) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSafetyLabel = (score: number) => {
    if (score >= 9) return 'Very Safe'
    if (score >= 7) return 'Safe'
    if (score >= 5) return 'Moderate'
    return 'Use Caution'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Hero Image */}
              <div className="relative h-64 w-full">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-800 text-sm font-medium rounded-full">
                    {place.category}
                  </span>
                </div>

                {/* Safety Score Badge */}
                <div className="absolute top-4 right-12">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${getSafetyColor(place.safetyScore)}`}>
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-semibold">{place.safetyScore}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">{place.name}</h2>
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold text-gray-900">{place.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{place.location}</span>
                  </div>

                  {/* Safety Info */}
                  <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg ${getSafetyColor(place.safetyScore)}`}>
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">{getSafetyLabel(place.safetyScore)} ({place.safetyScore}/10)</span>
                  </div>
                </div>

                {/* Description/Review */}
                {(place.description || place.review) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Place</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {place.review || place.description}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {place.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      Features & Amenities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {place.hours && (
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{place.hours}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Updated {place.lastUpdated}</span>
                    </div>

                    {place.author && (
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Reviewed by {place.author}</span>
                      </div>
                    )}

                    {place.totalReviews && (
                      <div className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 mr-2" />
                        <span>{place.totalReviews} reviews</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/place/${place.id}`}
                    className="flex-1 btn-primary text-center flex items-center justify-center"
                    onClick={onClose}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Details
                  </Link>
                  <Link
                    to="/add-review"
                    className="flex-1 btn-secondary text-center"
                    onClick={onClose}
                  >
                    Add Review
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PlaceCardModal