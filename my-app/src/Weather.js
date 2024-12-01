import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import WeatherFahrenheit from "./WeatherFahrenheit";
import axios from "axios";
import "./Weather.css";
import WeatherForecast from "./WeatherForecast";

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
      <div className="container">
        <div className="submit">
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
        </div>
        <div className="Weather">
          <h1>{city}</h1>
          <div className="clearfix">
            <img
              src={forecast.iconUrl}
              alt={forecast.description}
              className="float-left"
            />
          </div>
          <div className="WeatherFahrenheit">
            <WeatherFahrenheit celsius={forecast.temperature} />
          </div>
          <div className="date">
            <FormattedDate date={forecast.date} />
          </div>

          <div className="description">{forecast.description}</div>

          <div className="current">
            <span className="pink">💧♒︎ : {forecast.humidity}%</span>

            <span className="pink">: {forecast.wind}km/h</span>
          </div>
        </div>
        <WeatherForecast />
      </div>
    );
  } else {
    Search();
    return "Loading..";
  }
}
