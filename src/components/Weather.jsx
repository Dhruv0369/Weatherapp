import '../App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import humidityIcon from '../assets/images/humidity.png';
import windIcon from '../assets/images/wind.png';
import cloudIcon from '../assets/images/cloud.png';
import clearIcon from '../assets/images/clear.png';
import rainIcon from '../assets/images/rain.png';
import snowIcon from '../assets/images/snow.png';
import mistIcon from '../assets/images/mist.png';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Rajkot");
  const [error, setError] = useState(false);

  const apiKey = "f3ecf864aab128596ade8b44603dbcb2";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  const getWeather = async () => {
    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      console.log(apiUrl);
      setError(false);
    } catch (err) {
      setError(true);
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    getWeather();
  };

  useEffect(() => {
    getWeather();
    const interval = setInterval(getWeather, 60000); // Auto-refresh every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const handleIcon = (main) => {
    switch (main) {
      case 'Clear': return clearIcon;
      case 'Rain': return rainIcon;
      case 'Snow': return snowIcon;
      case 'Clouds': return cloudIcon;
      case 'Mist': return mistIcon;
      default: return cloudIcon;
    }
  };

  return (
    <div className="box">
      <div className="search">
        <div>
          <i className="fa fa-map-marker" aria-hidden="true" />
          <input
            type="search"
            className="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter Your Location"
          />
        </div>
        <button htmlFor="city" onClick={handleSearch}>
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </div>

      {error ? (
        <div className="container">
          <div className="weather">
            <img src={cloudIcon} alt="Error Icon" />
          </div>
          <div className="weather">
            <h1 className="name">Error! 404</h1>
            <h2 className="name">City Not Found</h2>
          </div>
        </div>
      ) : (
        weatherData && (
          <div className="container">
            <div className="weather">
              <img id="icon" src={handleIcon(weatherData.weather[0].main)} alt="" />
              <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
              <h2 className="name">{weatherData.name}, {weatherData.sys.country}</h2>
            </div>


            <div className="temp2">
              <div>
                <h1 className="mintemp">{Math.round(weatherData.main.temp_min)}°C</h1>
                <h4>Min Temp</h4>
              </div>
              <div>
                <h1 className="maxtemp">{Math.round(weatherData.main.temp_max)}°C</h1>
                <h4>Max Temp</h4>
              </div>
            </div>


            <div className="detail">
              <div className="col">
                <img src={humidityIcon} alt="Humidity Icon" />
              </div>

              <div>
                <h1 className="humidity">{weatherData.main.humidity}%</h1>
                <h4>Humidity</h4>
              </div>

              <div className="col">
                <img src={windIcon} alt="Wind Icon" />
              </div>
              <div>
                <h1 className="wind">{Math.round(weatherData.wind.speed)} km/h</h1>
                <h4>Wind Speed</h4>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
