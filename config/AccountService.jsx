class AccountService{
    constructor() {
        this.baseUrl = process.env.API_URL; // OpenWeatherMap API URL
        this.baseToken = process.env.API_TOKEN; // OpenWeatherMap API key

        this.geocodingBaseUrl = process.env.GEOCODING_API_URL // OpenCage API URL
        this.geocodingApiToken = process.env.GEOCODING_API_TOKEN; // OpenCage API key

      }
      
    async getCoordinates(location) {
      console.log('location:', location);
      console.log(this.geocodingBaseUrl);
      const url = `${this.geocodingBaseUrl}?q=${encodeURIComponent(location)}&key=${this.geocodingApiToken}`;
      const response = await fetch(url);
      // console.log(response);
        if (!response.ok) throw new Error(`Error fetching weather data: ${response.statusText}`);
        const data = await response.json();
        if (data.results.length === 0) throw new Error('Location not found');
        const { lat, lng } = data.results[0].geometry;
        return { lat, lon: lng };
      }

      async getCitySuggestions(query) {
        const url = `${this.geocodingBaseUrl}?q=${encodeURIComponent(query)}&key=${this.geocodingApiToken}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error finding location: ${response.statusText}`);
        const data = await response.json();
        return Array.isArray(data.results)
        ? data.results.map(result => {
            const suggestion = {
              name: result.formatted,
              lat: result.geometry.lat,
              lon: result.geometry.lng
            };
            // console.log(`Name: ${suggestion.name}, Lat: ${suggestion.lat}, Lon: ${suggestion.lon}`);
            return suggestion;
          })
        : [];
      }
    
    async getWeather(lat, lon) {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.baseToken}&units=metric`;

    try {
      const response = await fetch(url);
      // console.log(response.weather[0].description);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }





}

export default new AccountService();
