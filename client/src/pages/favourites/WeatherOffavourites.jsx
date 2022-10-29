import React, { useState, useContext, useEffect } from "react";
import SearchBar from "../../components/inputData/searchBar.component";
import { AuthContext } from "../../context/auth.context";
import FavouriteList from "../../components/Favorites/FavoriteList";
import { Typography, message } from "antd";
import "./WeatherOfFavorites.css";
import axiosInstance from "../../services/axios_instance";

const WeatherOffavourites = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allfavourites, setAllfavourites] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const onSelect = (data, option) => {
    setSelectedOption(option);
    setInputValue(option.label);
  };

  var suggestions = [];
  const onChange = async (data, option) => {
    setInputValue(data);
    setSelectedOption(option); // to remove selected option when user types  something wich doesn't match with any option

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
      const response = await fetch(endpoint);
      const results = await response.json();
      console.log(results.features[0].center);
      results.features.map((place) => {
        suggestions.push(place.place_name);
      });
      console.log(suggestions);
      const myOptions = suggestions.map((sugg) => {
        return {
          value: sugg.toUpperCase(),
          label: sugg,
        };
      });
      setOptions(myOptions);
      console.log(myOptions);
      const latitude = results.features[0].center[1];
      const longitude = results.features[0].center[0];
      console.log(latitude, longitude);
      const getWeather = async () => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API}`
        );
        const result = await res.json();
        console.log(result);
      };
      getWeather();
    } catch (error) {
      console.log("Error in search bar location", error);
    }
  };

  const handleSearch = (value) => {
    // todo : search for the value in the database
    const postfavourites = async () => {
      setLoading(true);

      const res = await axiosInstance.post(`/user/${user._id}/addfavourites`, {
        value: value,
      });
      console.log(res);
      setLoading(false);
    };
    postfavourites();
    console.log(value);
  };

  const appendData = async () => {
    const res = await axiosInstance.get(`/user/${user._id}/getfavourites`);
    console.log(res.data);
    setAllfavourites(res.data.user.favouritePlaces);
    message.success(
      `${res.data.user.favouritePlaces.length} more items loaded!`
    );
  };

  useEffect(() => {
    appendData();
  }, [loading]);

  const ContainerHeight = 400;

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  const { Title } = Typography;
  return (
    <div>
      <div className="favourites__title">
        <Title>View Weather of your favourites</Title>
      </div>
      <div className="favourite__searchBar">
        <SearchBar
          inputValue={inputValue}
          onChange={onChange}
          onSelect={onSelect}
          options={options}
          enterButton={`Add favourite`}
          placeholder={`Enter your favourite city/address`}
          width={370}
          handleSearch={handleSearch}
        />
      </div>
      {!loading ? (
        <FavouriteList
          allfavourites={allfavourites}
          onScroll={onScroll}
          appendData={appendData}
          ContainerHeight={ContainerHeight}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default WeatherOffavourites;
