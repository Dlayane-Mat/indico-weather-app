import React from "react";
import "./App.css";
import Weather from "./Weather";
import WeatherForecast from "./WeatherForecast";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Limpopo" />
        <WeatherForecast />
        <footer>
          <p>
            This project was coded{" "}
            <a href="https://github.com/Dlayane-Mat/" target="blank">
              Dlayane Matjila
            </a>{" "}
            and is open-sourced on{" "}
            <a
              href="https://github.com/Dlayane-Mat/my-weather-application"
              target="blank"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
