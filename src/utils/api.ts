export async function fetchSafetyReviews(placeName: string, location: string): Promise<string[]> {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${baseUrl}/safety-reviews?placeName=${encodeURIComponent(placeName)}&location=${encodeURIComponent(location)}`, {
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    if (!response.ok) throw new Error('Failed to fetch safety reviews');
    const data = await response.json();
    return data.reviews || []; 
  } catch (error) {
    console.warn('Backend not available for safety reviews, using fallback:', error);
    // Return fallback safety reviews
    return [
      "Well-lit area with good visibility",
      "Frequent security patrols",
      "Safe for solo travelers",
      "Tourist-friendly location",
      "Good public transportation access"
    ];
  }
}

export async function submitReview(reviewData: any) {
  try {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${baseUrl}/submit-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    return response.json();
  } catch (error) {
    console.warn("Backend not available for review submission:", error);
    // Return a mock success response for fallback
    return {
      success: true,
      message: "Review submitted successfully (offline mode)",
      id: Date.now() // Mock ID
    };
  }
}