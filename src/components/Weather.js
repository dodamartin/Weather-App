import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = '13ebe08c22b092c23dbab3adc542331b'; // Replace with your API key

  const fetchWeatherData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => {
        setWeatherData(response.data);
        setError(null);
      })
      .catch((error) => {
        setWeatherData(null);
        setError('City not found. Please enter a valid city name.');
      });
  };

  useEffect(() => {
    if (weatherData) {
      fetchWeatherIcon(weatherData.weather[0].id);
    }
  }, [weatherData]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
    }
  };

  const fetchWeatherIcon = (weatherCode) => {
    // Define your mapping of weather condition codes to icon URLs
    const iconMapping = {
      800: 'https://www.freeiconspng.com/uploads/sunny-icon-0.png', // Clear sky
      500: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Light rain
      501: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Moderate rain
      502: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Heavy rain
      503: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Very heavy rain
      504: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Extreme rain
      511: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Freezing rain
      520: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Light shower rain
      521: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Shower rain
      522: 'https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png', // Heavy shower rain
    };

    const defaultIcon = 'https://www.freeiconspng.com/uploads/cloud-icon-22.png'; // Default icon for other conditions

    // Check if the weather code is in the mapping; otherwise, use the default icon
    const iconUrl = iconMapping[weatherCode] || defaultIcon;

    // Set the icon URL in the weatherData object
    setWeatherData((prevData) => ({
      ...prevData,
      iconUrl: iconUrl,
    }));
  };

  return (
    <div className="container">
      <h1 className="display-4 text-center mb-4">Weather App</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={fetchWeatherData} style={{border:'none'}}>
                Get Weather
              </button>
            </div>
          </div>
          {weatherData ? (
            <div className="card">
                <div className="card-body">
                {/* Display weather icon */}
                {weatherData.iconUrl && (
                    <img src={weatherData.iconUrl} alt="Weather Icon" className="weather-icon" width="100" />
                )}
                <h2 className="city-name">
                    {weatherData.name}, {weatherData.sys?.country}
                </h2>
                <p className="temperature">
                    Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
                </p>
                <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
                <p className="weather-description">
                    Weather: {weatherData.weather[0].description}
                </p>
                </div>
            </div>
            ) : (
            <p>ADD CITY...</p>
            )}

            {error && <p className="alert alert-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
