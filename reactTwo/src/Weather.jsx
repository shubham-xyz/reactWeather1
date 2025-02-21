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
  <table className="forecast-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Condition</th>
        <th>Max Temp (°F)</th>
        <th>Min Temp (°F)</th>
        <th>Avg Temp (°F)</th>
        <th>Humidity (%)</th>
        <th>Wind Speed (km/h)</th>
        <th>Precipitation (mm)</th>
        <th>UV Index</th>
        <th>Sunrise</th>
        <th>Sunset</th>
      </tr>
    </thead>
    <tbody>
      {days.slice(0, 7).map((day, index) => (
        <tr key={index}>
          <td>{day.datetime}</td>
          <td>{day.conditions}</td>
          <td>{day.tempmax}</td>
          <td>{day.tempmin}</td>
          <td>{day.temp}</td>
          <td>{day.humidity}</td>
          <td>{day.windspeed}</td>
          <td>{day.precip}</td>
          <td>{day.uvindex}</td>
          <td>{day.sunrise}</td>
          <td>{day.sunset}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Weather;