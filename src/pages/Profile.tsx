import React from 'react'
import { motion } from 'framer-motion'
import { User, MapPin, Star, Shield, Calendar, Award, TrendingUp } from 'lucide-react'

const Profile = () => {
  const userStats = {
    reviewsCount: 23,
    placesVisited: 45,
    helpfulVotes: 156,
    safetyContributions: 89
  }

  const recentReviews = [
    {
      id: 1,
      place: 'Blue Bottle Coffee',
      location: 'Tokyo, Japan',
      rating: 4.8,
      safetyScore: 9.2,
      date: '2024-01-15',
      helpful: 12
    },
    {
      id: 2,
      place: 'Hostel World Shibuya',
      location: 'Tokyo, Japan',
      rating: 4.6,
      safetyScore: 8.9,
      date: '2024-01-10',
      helpful: 8
    },
    {
      id: 3,
      place: 'Senso-ji Temple',
      location: 'Tokyo, Japan',
      rating: 4.9,
      safetyScore: 9.5,
      date: '2024-01-05',
      helpful: 15
    }
  ]

  const achievements = [
    { icon: Star, title: 'Top Reviewer', description: '20+ reviews submitted' },
    { icon: Shield, title: 'Safety Expert', description: 'High-quality safety ratings' },
    { icon: MapPin, title: 'Explorer', description: '10+ cities reviewed' },
    { icon: Award, title: 'Community Helper', description: '100+ helpful votes' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sarah Johnson</h1>
              <p className="text-gray-600 mb-4">Solo traveler • Safety advocate • Community contributor</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Joined January 2023</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Based in San Francisco</span>
                </div>
              </div>
            </div>

            <button className="btn-primary">
              Edit Profile
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Impact</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Reviews</p>
                      <p className="text-sm text-gray-500">Places reviewed</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-primary-600">{userStats.reviewsCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-secondary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Places Visited</p>
                      <p className="text-sm text-gray-500">Unique locations</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-secondary-600">{userStats.placesVisited}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Helpful Votes</p>
                      <p className="text-sm text-gray-500">Community appreciation</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{userStats.helpfulVotes}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Safety Contributions</p>
                      <p className="text-sm text-gray-500">Safety insights shared</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{userStats.safetyContributions}</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-6">
                {recentReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="border border-gray-100 rounded-lg p-6 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{review.place}</h3>
                        <div className="flex items-center text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{review.location}</span>
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

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Reviewed on {new Date(review.date).toLocaleDateString()}</span>
                      <span>{review.helpful} people found this helpful</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile