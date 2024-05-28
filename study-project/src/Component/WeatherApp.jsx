import './Weather.css';

import searchIcon from '../assets/search.png';
import clearIcon from '../assets/claear.png';
import cloudyIcon from '../assets/cloudy.png';
import snowIcon from '../assets/snowflake.png';
import drizzled from '../assets/drizled.png';
import rainIcon from '../assets/rain.png';
import humitityp from '../assets/climate.png';
import windp from '../assets/wind.png';
import { useState, useEffect } from 'react';


const WeatherDetails = ({ icon, temp, city, country, lat, log, humitity, wind }) => {
  return (
    <>
      <div className='image-1'>
        <img src={icon} alt="image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>latitude</span>
          <span>{log}</span>
        </div>
        <div>
          <span className='log'>Longitude</span>
          <span>{lat}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humitityp} alt="humitity" width='40px' className='icon' />
          <div className="data">
            <div className="humitityper">{humitity}%</div>
            <div className="text">Humitidy</div>
          </div>
        </div>
        <div className="element">
          <img src={windp} alt="wind" width='40px' className='icon' />
          <div className="data">
            <div className="humitityper">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
}

export const WeatherApp = () => {
    const api = "a1a9f7f2c5e700805215ba77c7dd8612";
    const [text, setText] = useState("Coimbatore")
  
    const [icon, setIcon] = useState(snowIcon)
    const [temp, setTemp] = useState(0)
    const [city, setCity] = useState("")
    const [country, setCoutry] = useState("")
    const [lat, setLat] = useState(0)
    const [log, setLog] = useState(0)
    const [humitity, setHumitity] = useState(0)
    const [wind, setWind] = useState(0)
    const [loading, setLoading] = useState(false)
    const [citynotfound, setCityFound] = useState(false);
    const [error, setError] = useState(null)
  
    const weatherIconMap = {
      "01d": clearIcon,
      "01n": clearIcon,
      "02d": clearIcon,
      "02n": clearIcon,
      "03d": drizzled,
      "03n": drizzled,
      "04d": cloudyIcon,
      "04n": cloudyIcon,
      "09d": rainIcon,
      "09n": rainIcon,
      "010d": rainIcon,
      "010n": rainIcon,
      "013d": searchIcon,
      "013n": searchIcon,
    }
  
  
  
    const search = async () => {
      setLoading(true)
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api}&units=metric`;
  
      try {
        let res = await fetch(url);
        let data = await res.json();
        // console.log(data)
        if (data.cod === "200") {
          console.error("City Not Found");
          setCityFound(true);
          setCity(false);
          return;
        }
  
        setHumitity(data.main.humidity);
        setWind(data.wind.speed);
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCoutry(data.sys.country);
        setLat(data.coord.lat);
        setLog(data.coord.lon);
        const weatherIconcode = data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconcode] || clearIcon)
        setCityFound(false)
  
      } catch (error) {
        console.error("An Error Occurred : ", error.message)
        setError("error")
      } finally {
        setLoading(false);
      }
    }
  
    const handleTexct = (e) => {
      setText(e.target.value);
    }
  
    const enterKey = (e) => {
      if (e.key === "Enter") {
        search()
      }
    }
  
    useEffect(() => {
      search()
    }, [])
  
    return (
      <>
        <div className='container'>
          <div className='input-container'>
            <input type='text' className='city-input' placeholder='Search City' onKeyDown={enterKey} onChange={handleTexct} value={text} />
            <div className='search-icon'>
              <img src={searchIcon} alt="SearchIcon" width='15px' onClick={() => search()} />
            </div>
          </div>
          
            {loading && <div className="loading-msg">Loading....</div>}
            {error && <div className="error-msg">{error}</div>}
            {citynotfound && <div className="city-not">City Not Found</div>}
  
            {!loading && !citynotfound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} 
            log={log} humitity={humitity} wind={wind} />}
  
  
          <div className="footer">
            <div className="footer-text">Designed By <span>Jeyaram Ramesh</span></div>
          </div>
        </div>
      </>
    )
  }

