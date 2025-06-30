import { motion } from 'framer-motion'
import { MapPin, Star, Shield, Clock, Users, Camera, ThumbsUp, Flag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PlaceDetails = () => {
  const { id } = useParams()
  const [reviews, setReviews] = useState<any[]>([])
  const [place, setPlace] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://safe-wander-backend.onrender.com"

  // Mock data - in real app, this would be fetched based on the ID
  const mockPlace = {
    id: 1,
    name: 'Blue Bottle Coffee',
    category: 'Cafe',
    location: 'Shibuya, Tokyo, Japan',
    rating: 4.8,
    safetyScore: 9.2,
    totalReviews: 127,
    images: [
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    tags: ['WiFi Available', 'Solo-friendly', 'Well-lit', 'English-speaking staff'],
    hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
    description: 'A popular coffee chain known for its high-quality beans and minimalist aesthetic. This Shibuya location is particularly welcoming to solo travelers.',
    coordinates: [35.6762, 139.6503],
    lastUpdated: '2 hours ago'
  }

  const mockReviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 4.8,
      safetyScore: 9.2,
      review: 'Perfect spot for solo work sessions. Great WiFi, friendly staff, and felt very safe even late in the evening.',
      tags: ['WiFi', 'Solo-friendly', 'Well-lit'],
      date: '2024-01-15',
      helpful: 15
    },
    {
      id: 2,
      author: 'Emma K.',
      rating: 4.9,
      safetyScore: 9.0,
      review: 'Love this place! The staff speaks English and the location feels very secure. Perfect for digital nomads.',
      tags: ['English-speaking staff', 'Safe area'],
      date: '2024-01-10',
      helpful: 12
    },
    {
      id: 3,
      author: 'Lisa J.',
      rating: 4.7,
      safetyScore: 9.3,
      review: 'Excellent coffee and atmosphere. Well-lit interior and busy enough to feel safe but not overcrowded.',
      tags: ['Great coffee', 'Well-lit', 'Good atmosphere'],
      date: '2024-01-08',
      helpful: 8
    }
  ]

  useEffect(() => {
    const fetchPlaceAndReviews = async () => {
      try {
        setLoading(true)
        console.log('Fetching reviews from:', BACKEND_URL)
        
        // Add timeout and better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds for Render cold starts
        
        const res = await fetch(`${BACKEND_URL}/reviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          signal: controller.signal,
          mode: 'cors', // Explicitly set CORS mode
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        
        if (data.reviews && Array.isArray(data.reviews)) {
          console.log('Fetched reviews:', data.reviews)
          
          // If we have a specific place ID, try to find matching reviews
          if (id) {
            const matchingReviews = data.reviews.filter((review: any) => review.id.toString() === id)
            if (matchingReviews.length > 0) {
              const dbPlace = matchingReviews[0]
              setPlace({
                ...mockPlace,
                id: dbPlace.id,
                name: dbPlace.placeName,
                category: dbPlace.category,
                location: dbPlace.location,
                rating: dbPlace.rating,
                safetyScore: dbPlace.safetyScore,
                totalReviews: matchingReviews.length,
                tags: JSON.parse(dbPlace.tags || '[]'),
                description: dbPlace.review || mockPlace.description,
                lastUpdated: new Date(dbPlace.created_at).toLocaleDateString()
              })
              setReviews(matchingReviews.map((review: any) => ({
                id: review.id,
                author: review.author || 'Anonymous Traveler',
                rating: review.rating,
                safetyScore: review.safetyScore,
                review: review.review,
                tags: JSON.parse(review.tags || '[]'),
                date: new Date(review.created_at).toLocaleDateString(),
                helpful: Math.floor(Math.random() * 20) + 1,
                isFromDatabase: true
              })))
            } else {
              // Use mock data if no matching review found
              setPlace(mockPlace)
              setReviews(mockReviews)
            }
          } else {
            // Show all database reviews if no specific ID
            const dbReviews = data.reviews.map((review: any) => ({
              id: review.id,
              author: review.author || 'Anonymous Traveler',
              rating: review.rating,
              safetyScore: review.safetyScore,
              review: review.review,
              tags: JSON.parse(review.tags || '[]'),
              date: new Date(review.created_at).toLocaleDateString(),
              helpful: Math.floor(Math.random() * 20) + 1,
              isFromDatabase: true
            }))
            
            setPlace({
              ...mockPlace,
              totalReviews: dbReviews.length
            })
            setReviews(dbReviews)
          }
        } else {
          // Fallback to mock data
          console.log('No reviews found, using mock data')
          setPlace(mockPlace)
          setReviews(mockReviews)
        }
      } catch (error) {
        console.error("Failed to fetch place details and reviews:", error);
        // Fallback to mock data
        setPlace(mockPlace)
        setReviews(mockReviews)
      } finally {
        setLoading(false)
      }
    };

    fetchPlaceAndReviews();
  }, [id, BACKEND_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading place details...</p>
          <p className="text-sm text-gray-500 mt-2">
            If this is taking a while, the server may be starting up. Please wait up to 30 seconds.
          </p>
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
                    <span className="font-medium">+5 more photos</span>
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
              Reviews ({reviews.length})
            </h2>
            <button className="btn-primary">
              Write a Review
            </button>
          </div>

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
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">{review.author}</p>
                        {review.isFromDatabase && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Verified Review
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {review.date}
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

          <div className="text-center mt-8">
            <button className="btn-secondary">
              Load More Reviews
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PlaceDetails