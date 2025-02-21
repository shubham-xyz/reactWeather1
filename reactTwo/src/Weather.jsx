import React, { useState } from "react";
import "./Weather.css"; // Correct import path

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (location.trim() === "") {
      setError("Please enter a location");
      return;
    }

    const key = "SX2EXLUUZ3KQREHXM2GV95H7F";
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Location not found. Please try again.");
      }

      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError(`Error: ${err.message}`);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <div className="input-section">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location (e.g., city or zip code)"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-display">
          <h2>Weather in {weatherData.resolvedAddress}</h2>
          <p><strong>Description:</strong> {weatherData.description}</p>
          {generateCurrentWeatherHTML(weatherData.currentConditions)}
          <hr />
          <h3>Next 7-Day Forecast</h3>
          <div className="forecast-container">
            {generateForecastHTML(weatherData.days)}
          </div>
        </div>
      )}
    </div>
  );
};

const generateCurrentWeatherHTML = (current) => (
  <div className="current-weather">
    <h3>Current Weather</h3>
    <p><strong>Condition:</strong> {current.conditions}</p>
    <p><strong>Temperature:</strong> {current.temp} °F</p>
    <p><strong>Feels Like:</strong> {current.feelslike} °F</p>
    <p><strong>Humidity:</strong> {current.humidity} %</p>
    <p><strong>Wind Speed:</strong> {current.windspeed} km/h</p>
    <p><strong>Wind Direction:</strong> {current.winddir}°</p>
    <p><strong>Pressure:</strong> {current.pressure} Pa</p>
    <p><strong>Visibility:</strong> {current.visibility} km</p>
    <p><strong>UV Index:</strong> {current.uvindex}</p>
    <p><strong>Sunrise:</strong> {current.sunrise}</p>
    <p><strong>Sunset:</strong> {current.sunset}</p>
  </div>
);

const generateForecastHTML = (days) => (
  <div className="forecast-table">
    {days.slice(0, 7).map((day, index) => (
      <div className="forecast-row" key={index}>
        <div className="forecast-cell"><strong>Date:</strong> {day.datetime}</div>
        <div className="forecast-cell"><strong>Condition:</strong> {day.conditions}</div>
        <div className="forecast-cell"><strong>Max Temp:</strong> {day.tempmax} °F</div>
        <div className="forecast-cell"><strong>Min Temp:</strong> {day.tempmin} °F</div>
        <div className="forecast-cell"><strong>Avg Temp:</strong> {day.temp} °F</div>
        <div className="forecast-cell"><strong>Humidity:</strong> {day.humidity} %</div>
        <div className="forecast-cell"><strong>Wind Speed:</strong> {day.windspeed} km/h</div>
        <div className="forecast-cell"><strong>Precipitation:</strong> {day.precip} mm</div>
        <div className="forecast-cell"><strong>UV Index:</strong> {day.uvindex}</div>
        <div className="forecast-cell"><strong>Sunrise:</strong> {day.sunrise}</div>
        <div className="forecast-cell"><strong>Sunset:</strong> {day.sunset}</div>
      </div>
    ))}
  </div>
);

export default Weather;