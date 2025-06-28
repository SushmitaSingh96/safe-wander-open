import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MapPin, Star, Shield, Camera, Plus, Search } from 'lucide-react'

interface ReviewForm {
  placeName: string
  category: string
  location: string
  rating: number
  safetyScore: number
  review: string
  tags: string[]
  visitTime: string
  wouldRecommend: boolean
}

const AddReview = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [safetyScore, setSafetyScore] = useState(0)
  const [images, setImages] = useState<File[]>([])

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ReviewForm>()

  const categories = [
    'Cafe/Restaurant',
    'Hotel/Accommodation',
    'Tourist Attraction',
    'Transportation',
    'Shopping',
    'Nightlife',
    'Healthcare',
    'Other'
  ]

  const availableTags = [
    'WiFi Available',
    'Solo-friendly',
    'Well-lit',
    'Female-only areas',
    '24/7 Security',
    'CCTV',
    'Staff speaks English',
    'Tourist area',
    'Local favorite',
    'Budget-friendly',
    'Luxury',
    'Accessible',
    'Pet-friendly',
    'Quiet',
    'Busy/Crowded',
    'Good for work',
    'Family-friendly'
  ]

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const onSubmit = (data: ReviewForm) => {
    const reviewData = {
      ...data,
      rating,
      safetyScore,
      tags: selectedTags,
      images
    }
    console.log('Review submitted:', reviewData)
    // Here you would typically send the data to your backend
    alert('Review submitted successfully!')
    reset()
    setSelectedTags([])
    setRating(0)
    setSafetyScore(0)
    setImages([])
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const handleLookForSafetyReviews = () => {
    const placeName = watch('placeName')
    const location = watch('location')
    
    if (!placeName && !location) {
      alert('Please enter a place name or location first to search for safety reviews.')
      return
    }
    
    // In a real app, this would search your database or external APIs
    // For now, we'll show a mock search
    const searchQuery = `${placeName || ''} ${location || ''}`.trim()
    alert(`Searching for safety reviews about "${searchQuery}"...\n\nThis feature would search through:\n• Existing user reviews\n• Reddit discussions\n• Travel forums\n• Government travel advisories\n• Recent news articles\n\nResults would show safety insights, recent incidents, and community recommendations.`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Experience</h1>
          <p className="text-xl text-gray-600">Help other women travelers by sharing your honest review</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        >
          {/* Basic Information */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>
              <button
                type="button"
                onClick={handleLookForSafetyReviews}
                className="inline-flex items-center px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-800 font-medium rounded-lg transition-colors duration-200"
              >
                <Search className="w-4 h-4 mr-2" />
                Look for Safety Reviews
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place Name *
                </label>
                <input
                  {...register('placeName', { required: 'Place name is required' })}
                  className="input-field"
                  placeholder="e.g., Blue Bottle Coffee"
                />
                {errors.placeName && (
                  <p className="text-red-500 text-sm mt-1">{errors.placeName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('location', { required: 'Location is required' })}
                    className="input-field pl-10"
                    placeholder="e.g., Shibuya, Tokyo, Japan"
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ratings</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {rating > 0 ? `${rating}/5` : 'Click to rate'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Safety Score *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setSafetyScore(score)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${
                        score <= safetyScore
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      } hover:border-green-500 transition-colors`}
                    >
                      {score}
                    </button>
                  ))}
                  <Shield className="w-5 h-5 text-green-600 ml-2" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Rate from 1 (unsafe) to 10 (very safe)
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tags</h2>
            <p className="text-gray-600 mb-4">Select all that apply to help other travelers</p>
            
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-100 text-primary-800 border-primary-200'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  } border`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Review</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Review *
                </label>
                <textarea
                  {...register('review', { required: 'Review is required', minLength: { value: 50, message: 'Review must be at least 50 characters' } })}
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Share your experience... What made you feel safe or unsafe? What would you recommend to other solo female travelers?"
                />
                {errors.review && (
                  <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When did you visit?
                </label>
                <select
                  {...register('visitTime')}
                  className="input-field"
                >
                  <option value="">Select time period</option>
                  <option value="last-week">Last week</option>
                  <option value="last-month">Last month</option>
                  <option value="last-3-months">Last 3 months</option>
                  <option value="last-6-months">Last 6 months</option>
                  <option value="last-year">Last year</option>
                  <option value="over-year">Over a year ago</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  {...register('wouldRecommend')}
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  I would recommend this place to other solo female travelers
                </label>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Photos (Optional)</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Add photos to help other travelers</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="btn-secondary cursor-pointer inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Photos
              </label>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                reset()
                setSelectedTags([])
                setRating(0)
                setSafetyScore(0)
                setImages([])
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="btn-primary px-8 py-3"
            >
              Submit Review
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default AddReview