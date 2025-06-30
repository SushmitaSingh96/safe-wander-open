export async function fetchSafetyReviews(placeName: string, location: string): Promise<string[]> {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "https://safe-wander-backend.onrender.com";
    const response = await fetch(`${baseUrl}/safety-reviews?placeName=${encodeURIComponent(placeName)}&location=${encodeURIComponent(location)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.reviews || []; 
  } catch (error) {
    console.error('Error fetching safety reviews:', error);
    return [];
  }
}

export async function submitReview(reviewData: any) {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "https://safe-wander-backend.onrender.com";
    const response = await fetch(`${baseUrl}/submit-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit review: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
}