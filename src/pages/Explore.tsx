import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Star, Shield, Clock, AlertCircle } from 'lucide-react'
import MapView from '../components/MapView'
import PlaceCardModal from '../components/PlaceCardModal'

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [dbPlaces, setDbPlaces] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://safe-wander-backend.onrender.com"

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        console.log('Fetching reviews from:', BACKEND_URL)
        
        // Add timeout and better error handling
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // Increased to 30 seconds for Render cold starts
        
        const response = await fetch(`${BACKEND_URL}/reviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          signal: controller.signal,
          mode: 'cors', // Explicitly set CORS mode
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()

        if (!data.reviews || !Array.isArray(data.reviews)) {
          console.warn('No reviews found or unexpected response:', data)
          setError('No reviews available from server')
          return
        }

        const reviews = data.reviews.map((review: any, index: number) => ({
          id: review.id,
          name: review.placeName,
          category: review.category,
          location: review.location,
          rating: review.rating,
          safetyScore: review.safetyScore,
          image: review.image_url || 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=400',
          tags: JSON.parse(review.tags || '[]'),
          lastUpdated: new Date(review.created_at).toLocaleDateString(),
          coordinates: [35.6895 + index * 0.001, 139.6917 + index * 0.001] as [number, number],
          author: review.author || 'Anonymous Traveler',
          review: review.review,
          created_at: review.created_at,
          description: review.review,
          hours: 'Hours vary by location',
          totalReviews: Math.floor(Math.random() * 50) + 10
        }))
        
        console.log('Fetched reviews:', reviews)
        setDbPlaces(reviews)
      } catch (error) {
        console.error('Error fetching reviews:', error)
        
        let errorMessage = 'Unable to connect to server. '
        
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            errorMessage += 'Request timed out. The server may be starting up (this can take up to 30 seconds on Render).'
          } else if (error.message.includes('Failed to fetch') || error.message.includes('Network Error')) {
            errorMessage += 'Network connection failed. Please check your internet connection and try again.'
          } else if (error.message.includes('CORS')) {
            errorMessage += 'Cross-origin request blocked. Please contact support.'
          } else {
            errorMessage += error.message
          }
        }
        
        errorMessage += ' Showing sample data instead.'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [BACKEND_URL])

  const categories = [
    { id: 'all', name: 'All Places' },
    { id: 'cafe', name: 'Cafes' },
    { id: 'hotel', name: 'Hotels' },
    { id: 'attraction', name: 'Attractions' },
    { id: 'transport', name: 'Transport' },
    { id: 'shopping', name: 'Shopping' }
  ]

  // Show mock places if no database places are available or if there's an error
  const mockPlaces = (dbPlaces.length === 0 || error) ? [
    {
      id: 1,
      name: 'Blue Bottle Coffee',
      category: 'Cafe',
      location: 'Shibuya, Tokyo',
      rating: 4.8,
      safetyScore: 9.2,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['WiFi', 'Solo-friendly', 'Well-lit'],
      lastUpdated: '2 hours ago',
      coordinates: [35.6762, 139.6503] as [number, number],
      description: 'A popular coffee chain known for its high-quality beans and minimalist aesthetic. This Shibuya location is particularly welcoming to solo travelers.',
      hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
      totalReviews: 127,
      author: 'Sarah M.'
    },
    {
      id: 2,
      name: 'Capsule Hotel Zen',
      category: 'Hotel',
      location: 'Shinjuku, Tokyo',
      rating: 4.6,
      safetyScore: 8.9,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Female-only floors', '24/7 security', 'Central location'],
      lastUpdated: '5 hours ago',
      coordinates: [35.6896, 139.6917] as [number, number],
      description: 'Modern capsule hotel with excellent security features and female-only floors. Perfect for solo female travelers looking for affordable, safe accommodation.',
      hours: '24/7 Check-in',
      totalReviews: 89,
      author: 'Emma K.'
    },
    {
      id: 3,
      name: 'Senso-ji Temple',
      category: 'Attraction',
      location: 'Asakusa, Tokyo',
      rating: 4.7,
      safetyScore: 9.0,
      image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Tourist area', 'Well-lit', 'Crowded', 'Safe'],
      lastUpdated: '1 day ago',
      coordinates: [35.7148, 139.7967] as [number, number],
      description: 'Tokyo\'s oldest temple with beautiful architecture and rich history. Well-patrolled area with plenty of tourists and good lighting.',
      hours: 'Daily: 6:00 AM - 5:00 PM',
      totalReviews: 203,
      author: 'Lisa J.'
    },
    {
      id: 4,
      name: 'Starbucks Reserve Roastery',
      category: 'Cafe',
      location: 'Nakameguro, Tokyo',
      rating: 4.5,
      safetyScore: 8.8,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['WiFi Available', 'Solo-friendly', 'Good for work'],
      lastUpdated: '3 hours ago',
      coordinates: [35.6434, 139.6982] as [number, number],
      description: 'Premium coffee experience with spacious seating and excellent WiFi. Great for digital nomads and solo workers.',
      hours: 'Daily: 7:00 AM - 11:00 PM',
      totalReviews: 156,
      author: 'Maria S.'
    }
  ] : []

  const places = error ? mockPlaces : [...dbPlaces, ...mockPlaces]

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           place.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const retryFetch = () => {
    window.location.reload()
  }

  const handlePlaceClick = (place: any) => {
    setSelectedPlace(place)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPlace(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <span className="text-lg text-gray-600">Loading places...</span>
              <p className="text-sm text-gray-500 mt-2">
                If this is taking a while, the server may be starting up. Please wait up to 30 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Safe Places</h1>
          <p className="text-xl text-gray-600">Discover verified safe spaces for women solo travelers</p>
          
          {/* Status Messages */}
          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-yellow-800">{error}</span>
                  <button 
                    onClick={retryFetch}
                    className="ml-4 text-yellow-800 underline hover:text-yellow-900 font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {dbPlaces.length > 0 && !error && (
            <p className="text-sm text-green-600 mt-2">
              Showing {dbPlaces.length} places from our database
            </p>
          )}
          
          {!error && dbPlaces.length === 0 && (
            <p className="text-sm text-blue-600 mt-2">
              Showing sample places (backend connection unavailable)
            </p>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search places, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {viewMode === 'list' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handlePlaceClick(place)}
              >
                <div className="relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-800 text-sm font-medium rounded-full">
                      {place.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">{place.safetyScore}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{place.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{place.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {place.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {place.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        +{place.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Updated {place.lastUpdated}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <MapView places={filteredPlaces} />
          </motion.div>
        )}

        {filteredPlaces.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No places found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Place Card Modal */}
      <PlaceCardModal
        place={selectedPlace}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default Explore