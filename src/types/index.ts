export interface Place {
  id: number
  name: string
  category: string
  location: string
  rating: number
  safetyScore: number
  image?: string
  tags: string[]
  lastUpdated: string
  coordinates: [number, number]
  description?: string
  hours?: string
  totalReviews?: number
}

export interface Review {
  id: number
  placeId: number
  author: string
  rating: number
  safetyScore: number
  review: string
  tags: string[]
  date: string
  helpful: number
  visitTime?: string
  wouldRecommend: boolean
  images?: string[]
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  joinDate: string
  location?: string
  bio?: string
  stats: {
    reviewsCount: number
    placesVisited: number
    helpfulVotes: number
    safetyContributions: number
  }
}

export interface AIInsight {
  id: number
  placeId: number
  source: 'reddit' | 'twitter' | 'blog' | 'news'
  content: string
  sentiment: 'positive' | 'negative' | 'neutral'
  safetyRelevant: boolean
  extractedAt: string
  url?: string
}

export type PlaceCategory = 
  | 'cafe'
  | 'hotel'
  | 'attraction'
  | 'transport'
  | 'shopping'
  | 'nightlife'
  | 'healthcare'
  | 'other'