import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Star, Shield, Clock } from 'lucide-react'
import MapView from '../components/MapView'
import axios from 'axios'

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [dbPlaces, setDbPlaces] = useState<any[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews`)
        const data = response.data

        if (!data.reviews || !Array.isArray(data.reviews)) {
          console.warn('No reviews found or unexpected response:', data)
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
          coordinates: [35.6895 + index * 0.001, 139.6917 + index * 0.001] as [number, number]
        }))
        setDbPlaces(reviews)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [])

  const categories = [
    { id: 'all', name: 'All Places' },
    { id: 'cafe', name: 'Cafes' },
    { id: 'hotel', name: 'Hotels' },
    { id: 'attraction', name: 'Attractions' },
    { id: 'transport', name: 'Transport' },
    { id: 'shopping', name: 'Shopping' }
  ]

  const places = [
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
      coordinates: [35.6762, 139.6503] as [number, number]
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
      coordinates: [35.6896, 139.6917] as [number, number]
    },
    {
      id: 3,
      name: 'Senso-ji Temple',
      category: 'Attraction',
      location: 'Asakusa, Tokyo',
      rating: 4.9,
      safetyScore: 9.5,
      image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Well-patrolled', 'Tourist-friendly', 'Day visits recommended'],
      lastUpdated: '1 day ago',
      coordinates: [35.7148, 139.7967] as [number, number]
    },
    {
      id: 4,
      name: 'Starbucks Reserve Roastery',
      category: 'Cafe',
      location: 'Nakameguro, Tokyo',
      rating: 4.7,
      safetyScore: 9.0,
      image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Spacious', 'Good for meetings', 'Safe area'],
      lastUpdated: '3 hours ago',
      coordinates: [35.6434, 139.6982] as [number, number]
    },
    ...dbPlaces
  ]

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           place.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

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
                    {place.tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
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
    </div>
  )
}

export default Explore