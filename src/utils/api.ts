export async function fetchSafetyReviews(place: string): Promise<string[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/safety-reviews?place=${encodeURIComponent(place)}`);
    if (!response.ok) throw new Error('Failed to fetch safety reviews');
    const data = await response.json();
    return data.reviews || []; 
  } catch (error) {
    console.error('Error fetching safety reviews:', error);
    return [];
  }
}