export const PLACE_CATEGORIES = [
  { id: 'cafe', name: 'Cafes & Restaurants', icon: '☕' },
  { id: 'hotel', name: 'Hotels & Accommodation', icon: '🏨' },
  { id: 'attraction', name: 'Tourist Attractions', icon: '📸' },
  { id: 'transport', name: 'Transportation', icon: '🚇' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌙' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'other', name: 'Other', icon: '📍' }
]

export const SAFETY_TAGS = [
  'Well-lit',
  'CCTV',
  '24/7 Security',
  'Female-only areas',
  'Staff speaks English',
  'Tourist area',
  'Local favorite',
  'Accessible',
  'Solo-friendly',
  'WiFi Available',
  'Good for work',
  'Quiet',
  'Busy/Crowded',
  'Budget-friendly',
  'Luxury',
  'Pet-friendly',
  'Family-friendly'
]

export const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
}

export const SAFETY_SCORE_LABELS = {
  1: 'Very Unsafe',
  2: 'Very Unsafe',
  3: 'Unsafe',
  4: 'Unsafe',
  5: 'Neutral',
  6: 'Neutral',
  7: 'Safe',
  8: 'Safe',
  9: 'Very Safe',
  10: 'Very Safe'
}

export const AI_SOURCES = [
  'reddit',
  'twitter',
  'travel_blogs',
  'news',
  'government_advisories',
  'embassy_reports'
] as const