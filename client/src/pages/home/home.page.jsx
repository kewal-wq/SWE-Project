import React, {useState} from "react";
import { AutoComplete, Input, Button } from "antd";
import SearchBar from "../../components/inputData/searchBar.component";
import DisplayWeather from "../../components/WeatherList/DisplayWeather";
import {toast} from "react-toastify"

const Home = () => {

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [weatherDataFromInput, setWeatherDataFromInput] = useState();
    const [weatherDatafromCurrentLoaction, setWeatherDatafromCurrentLoaction] = useState();

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
                label: sugg
            }
        });
        setOptions(myOptions);
        console.log(myOptions);    
        const latitude = results.features[0].center[1];
        const longitude = results.features[0].center[0];
        console.log(latitude, longitude);
        const getWeather = async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API}`);
            const result = res.json();
            setWeatherDataFromInput(result);
            console.log(result);
        }
        getWeather();
        
        
    } catch (error) {
        console.log("Error in search bar location", error);
    }
    };

    const handleWeather = (pos) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
            
            const getWeather = async () => {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API}`);
                const result = await res.json();
                setWeatherDatafromCurrentLoaction(result);
            }
            getWeather();
              
            });
          } else {
            toast("Please provide our location for getting weather");
          }
    }
    return (
        <div>
            <h1>Welcome to weather application</h1>
            <SearchBar inputValue={inputValue} onChange={onChange} onSelect={onSelect} options={options}/>
        <Button type="primary" onClick={handleWeather}>Weather by current location</Button>
        <DisplayWeather weatherData={weatherDataFromInput ? weatherDataFromInput : weatherDatafromCurrentLoaction}/>

       </div>
    )
}

export default Home