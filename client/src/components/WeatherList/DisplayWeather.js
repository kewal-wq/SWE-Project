import React from "react";
import { Typography } from "antd";
import "./DisplayWeather.scss";

const DisplayWeather = ({ weatherData }) => {
  console.log(weatherData);

  const { Title } = Typography;
  return (
    <div>
      {weatherData ? (
        <div>
          <div className="container">
            <div className="widget">
              <div className="details">
                <div className="temperature">
                  {Math.round(weatherData.main.temp - 273.15)}°
                </div>
                <div className="summary">
                  <p className="summaryText">
                    {weatherData.weather[0].description}
                  </p>
                </div>
                <div className="precipitation">
                  Humidity: {weatherData.main.humidity}%
                </div>
                <div class="wind">Wind Speed: {weatherData.wind.speed} mph</div>
              </div>
              <div className="pictoBackdrop"></div>
              <div className="pictoFrame"></div>
              <div className="pictoCloudBig"></div>
              <div className="pictoCloudFill"></div>
              <div className="pictoCloudSmall"></div>
              <div className="iconCloudBig"></div>
              <div className="iconCloudFill"></div>
              <div className="iconCloudSmall"></div>
            </div>
          </div>

          {/* <h1>Temperature: {weatherData.main.temp}</h1>
          <h1>Max Temp: {weatherData.main.temp_max}</h1>
          <h1>Min Temp: {weatherData.main.temp_min}</h1> */}
        </div>
      ) : (
        <Title level={3}>Select any option above to get weather</Title>
      )}
    </div>
  );
};

export default DisplayWeather;
