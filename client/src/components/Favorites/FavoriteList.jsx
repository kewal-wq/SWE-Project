import React, { useState } from "react";
import { Button, Modal, List, Typography } from "antd";
import VirtualList from "rc-virtual-list";
import "../WeatherList/DisplayWeather.scss";
import "./FavouriteList.css";

const FavouriteList = ({ allfavourites, onScroll, ContainerHeight }) => {
  const [open, setOpen] = useState(false);
  const [weatherData, setWeatherData] = useState();

  const handlePlaceWeather = async (place) => {
    console.log("Its clicked!!");
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
      const response = await fetch(endpoint);
      const results = await response.json();
      console.log(results.features[0].center);

      const latitude = results.features[0].center[1];
      const longitude = results.features[0].center[0];
      console.log(latitude, longitude);
      const getWeather = async () => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API}`
        );
        const result = await res.json();
        console.log(result);
        setWeatherData(result);
      };
      getWeather();
    } catch (error) {
      console.log("Error in search bar location", error);
    }

    setOpen(true);
  };

  console.log(allfavourites);
  const { Title } = Typography;

  return (
    <List>
      {console.log(allfavourites?.length)}
      {allfavourites?.length > 0 ? (
        <VirtualList
          data={allfavourites}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"
          onScroll={onScroll}
          className="virtualList__favorites"
        >
          {(place, idx) => (
            <List.Item key={idx}>
              <List.Item.Meta
                title={
                  <Title level={5}>
                    {idx + 1}. {place}
                  </Title>
                }
              />
              <div>
                <div>
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaceWeather(place);
                    }}
                  >
                    View Weather
                  </Button>
                  {weatherData ? (
                    <Modal
                      title="Weather of your location"
                      centered
                      open={open}
                      onOk={() => setOpen(false)}
                      onCancel={() => setOpen(false)}
                      width={900}
                      style={{padding: 0}}
                    >
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
                              <div class="wind">
                                Wind Speed: {weatherData.wind.speed} mph
                              </div>
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
                      </div>
                    </Modal>
                  ) : null}
                </div>
              </div>
            </List.Item>
          )}
        </VirtualList>
      ) : (
        <div className="emptyList__favourites">
          <Title>Your Favourites list is empty</Title>
        </div>
      )}
    </List>
  );
};

export default FavouriteList;
