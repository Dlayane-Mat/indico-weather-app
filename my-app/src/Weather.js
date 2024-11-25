import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import WeatherFahrenheit from "./WeatherFahrenheit";
import axios from "axios";
import "./WeatherFahrenheit";
import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [forecast, setForecast] = useState({ ready: false });

  function handleResponse(response) {
    setForecast({
      ready: true,
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      description: response.data.condition.description,
      date: new Date(response.data.time * 1000),
      iconUrl: response.data.condition.icon_url,
      city: response.data.city,
    });
  }
  function Search() {
    const apiKey = "0bd4693b39a661e4b0370fe772t7a9o3";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Search(city);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  if (forecast.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city"
            className="form-control"
            autoFocus="on"
            onChange={handleCityChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-primary w-100"
          />
        </form>
        <h1>{city}</h1>
        <FormattedDate date={forecast.date} />
        <div className="WeatherFahrenheit">
          <WeatherFahrenheit celsius={forecast.temperature} />
        </div>
        <div className="clearfix">
          <img
            src={forecast.iconUrl}
            alt={forecast.description}
            className="float-left"
          />
          <div className="description">{forecast.description}</div>
        </div>
        <div className="current">
          <span>Humidity:{forecast.humidity}%</span>
          <span>Wind:{forecast.wind}km/h</span>
        </div>
      </div>
    );
  } else {
    Search();
    return "Loading..";
  }
}
