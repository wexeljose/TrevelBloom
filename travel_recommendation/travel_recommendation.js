// Fetch data from JSON
async function fetchRecommendations() {
    try {
      const response = await fetch('travel_recommendation_api.json');
      const data = await response.json();
      console.log('Data fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchRecommendations();
  