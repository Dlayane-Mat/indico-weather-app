import React from "react";

export default function WeatherForecast() {
  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="forecast-day">Thur</div>
          <div className="icon"></div>
          <div className="forecast-temp">
            <div className="max-temp">22</div>
            <div className="min-temp">15</div>
          </div>
        </div>
      </div>
    </div>
  );
}
