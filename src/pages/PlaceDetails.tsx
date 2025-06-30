import { motion } from 'framer-motion'
import { MapPin, Star, Shield, Clock, Users, Camera, ThumbsUp, Flag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PlaceDetails = () => {
  const { id } = useParams()
  const [reviews, setReviews] = useState<any[]>([])
  const [place, setPlace] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlaceAndReviews = async () => {
      try {
        setLoading(true)
        
        // Fetch all reviews
        const reviewsResponse = await fetch(`${BACKEND_URL}/reviews`)
        const reviewsData = await reviewsResponse.json()
        
        if (reviewsData.reviews && Array.isArray(reviewsData.reviews)) {
          // If we have an ID, filter reviews for that specific place
          let filteredReviews = reviewsData.reviews
          let selectedPlace = null
          
          if (id) {
            // Find the specific place by ID
            filteredReviews = reviewsData.reviews.filter((review: any) => review.id.toString() === id)
            if (filteredReviews.length > 0) {
              selectedPlace = filteredReviews[0]
            }
          } else {
            // If no ID, show the first place as default
            selectedPlace = reviewsData.reviews[0]
            filteredReviews = reviewsData.reviews.filter((review: any) => 
              review.placeName === selectedPlace?.placeName && 
              review.location === selectedPlace?.location
            )
          }

          if (selectedPlace) {
            // Create place object from the review data
            const placeData = {
              id: selectedPlace.id,
              name: selectedPlace.placeName,
              category: selectedPlace.category,
              location: selectedPlace.location,
              rating: selectedPlace.rating,
              safetyScore: selectedPlace.safetyScore,
              totalReviews: filteredReviews.length,
              images: [
                selectedPlace.image_url || 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800'
              ],
              tags: JSON.parse(selectedPlace.tags || '[]'),
              hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
              description: selectedPlace.review || 'A popular location recommended by our community of solo female travelers.',
              coordinates: [35.6762, 139.6503],
              lastUpdated: new Date(selectedPlace.created_at).toLocaleDateString()
            }
            
            setPlace(placeData)
            
            // Format reviews for display
            const formattedReviews = filteredReviews.map((review: any) => ({
              id: review.id,
              author: review.author || 'Anonymous Traveler',
              rating: review.rating,
              safetyScore: review.safetyScore,
              review: review.review,
              tags: JSON.parse(review.tags || '[]'),
              date: review.created_at,
              helpful: Math.floor(Math.random() * 20) + 1, // Random helpful count for now
              isAiGenerated: review.aiSuggestedReview && review.aiSuggestedReview.length > 0
            }))
            
            setReviews(formattedReviews)
          }
        }
      } catch (error) {
        console.error("Failed to fetch place details and reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaceAndReviews()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading place details...</p>
        </div>
      </div>
    )
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Place not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8"
        >
          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-2 h-80">
            <div className="md:col-span-2">
              <img
                src={place.images[0]}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-2">
              <img
                src={place.images[1]}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <div className="relative">
                <img
                  src={place.images[2]}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="flex items-center text-white">
                    <Camera className="w-5 h-5 mr-2" />
                    <span className="font-medium">+{Math.max(0, reviews.length - 3)} more photos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Place Info */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{place.name}</h1>
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                    {place.category}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{place.location}</span>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-semibold text-gray-900">{place.rating}</span>
                    <span className="text-gray-500">({place.totalReviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-xl font-semibold text-green-600">{place.safetyScore}</span>
                    <span className="text-gray-500">Safety Score</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="btn-primary">
                  Add Review
                </button>
                <button className="btn-secondary">
                  Save Place
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {place.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{place.description}</p>

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{place.hours}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Last updated {place.lastUpdated}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Reviews ({place.totalReviews})
            </h2>
            <button className="btn-primary">
              Write a Review
            </button>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-b border-gray-100 pb-8 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {review.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900">{review.author}</p>
                          {review.isAiGenerated && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              AI Enhanced
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{review.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">{review.safetyScore}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.review}</p>

                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {review.tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
                      <Flag className="w-4 h-4" />
                      <span className="text-sm">Report</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Star className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your experience!</p>
              <button className="btn-primary">
                Write the First Review
              </button>
            </div>
          )}

          {reviews.length > 5 && (
            <div className="text-center mt-8">
              <button className="btn-secondary">
                Load More Reviews
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default PlaceDetails