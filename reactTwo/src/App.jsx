import React from "react";
import "./App.css"; // Correct import path
import Weather from "./Weather"; // Importing the Weather component

function App() {
  return (
    <div className="container">
      <h1>Weather App</h1>
      <Weather />
    </div>
  );
}

export default App;