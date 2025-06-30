import { motion } from 'framer-motion'
import { MapPin, Star, Shield, Clock, Users, ThumbsUp, Flag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PlaceDetails = () => {

  const { id } = useParams();
  const [place, setPlace] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/reviews/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch review with id ${id}, status: ${res.status}`);
        }
        const data = await res.json();
        const review = data.review;

        setPlace({
          id: review.id,
          name: review.placeName,
          category: review.category,
          location: review.location,
          rating: review.rating,
          safetyScore: review.safetyScore,
          totalReviews: 1,
          images: [review.image_url || 'https://via.placeholder.com/800'],
          tags: review.tags ? JSON.parse(review.tags) : [],
          hours: 'Unknown',
          description: '', // empty string,
          lastUpdated: new Date(review.created_at).toLocaleDateString(),
        });

        setReviews([{
          id: review.id,
          author: 'Anonymous',
          rating: review.rating,
          safetyScore: review.safetyScore,
          review: review.review,
          tags: review.tags ? JSON.parse(review.tags) : [],
          date: review.lastVisitTime,
          helpful: 0,
        }]);
      } catch (err) {
        console.error('Failed to fetch place:', err);
      }
    };

    if (id) {
      fetchPlace();
    }
  }, [id, BACKEND_URL]);

  if (!place) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
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
        {/* Single Image */}
        <div className="h-80 w-full">
          <img
            src={place.images}
            alt={place.name}
            className="w-full h-full object-cover rounded-xl"
          />
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
                      <p className="font-semibold text-gray-900">{review.author}</p>
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