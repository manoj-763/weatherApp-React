import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import night_icon from "../assets/night.png";

// eslint-disable-next-line react/prop-types
const Weather = ({ theme, setTheme }) => {
  const [weatherData, setWeatherData] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const inputRef = useRef();

  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const toggleButton = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": cloud_icon,
    "09n": cloud_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      toast.warn("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aa7487dc028ba929d1b69894ca415ee0`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: icon,
        country: data.sys.country,
      });
    } catch (error) {
      setWeatherData(error.message);
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <img
          className="toggle-image"
          onClick={() => {
            toggleButton();
          }}
          src={night_icon}
          alt="day_icon"
        />
        <input ref={inputRef} type="text" placeholder="Search City Name..." />
        <img
          src={search_icon}
          alt="search-icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={weatherData.icon} className="weather-icon" alt="clear_icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
      <div className="weather-information">
        <h2>Weather Information</h2>
        <p>Country: {weatherData.country}</p>
        <p>Date: {formattedDate}</p>
        <p>Time: {formattedTime}</p>
      </div>
    </div>
  );
};

export default Weather;
