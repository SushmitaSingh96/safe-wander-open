export async function fetchSafetyReviews(placeName: string, location: string): Promise<string[]> {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${baseUrl}/safety-reviews?placeName=${encodeURIComponent(placeName)}&location=${encodeURIComponent(location)}`);
    if (!response.ok) throw new Error('Failed to fetch safety reviews');
    const data = await response.json();
    return data.reviews || []; 
  } catch (error) {
    console.error('Error fetching safety reviews:', error);
    return [];
  }
}

export async function submitReview(reviewData: any) {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${baseUrl}/submit-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    return response.json();
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
}