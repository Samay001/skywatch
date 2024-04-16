import React, { useState, useEffect } from "react";
import { useCity } from "../context/cityContext.tsx";
import axios from "axios";
import { Toaster, toast } from "sonner";
import WeatherComponentBox from "../components/weatherComponentBox.tsx";
import { MdPlace } from "react-icons/md";
//@ts-ignore
import weatherIcon from "../assets/animated/01d.svg";
//@ts-ignore
import scatterdCloud from "../assets/animated/02d.svg";
//@ts-ignore
import windIcon from "../assets/animated/wind-speed.svg";
//@ts-ignore
import humidityIcon from "../assets/animated/humidity.svg";
//@ts-ignore
import pressureIcon from "../assets/animated/pressure.svg";
//@ts-ignore
import visibilityIcon from "../assets/animated/visibility.svg";
//@ts-ignore
import sunriseIcon from "../assets/animated/sunrise.svg";
//@ts-ignore
import sunsetIcon from "../assets/animated/sunset.svg";
//@ts-ignore
import feelLikeIcon from "../assets/animated/50n.svg";
//@ts-ignore
import minTempIcon from "../assets/animated/sunset.svg";
//@ts-ignore
import maxTempIcon from "../assets/animated/sunset.svg";

const CityWeather = () => {
  const { clickedCityData } = useCity();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherImage, setWeatherImage] = useState(null);

  const fetchWeatherData = async () => {
    if (clickedCityData) {
      try {
        const { latitude, longitude } = clickedCityData;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
        );
        setWeatherData(response.data);
        toast.success("Weather data fetched successfully");
    
      } catch (error) {
        toast.error("Error fetching weather data");
      }
    }
  };


  useEffect(() => {
    fetchWeatherData();
  }, [clickedCityData]);

  return (
    <div
      className="container1 text-white px-20 md:p-8 min-h-screen"
      style={{ backgroundColor: "#0F172A" }}
    >
      <Toaster />
      {weatherData && (
        <div className="section1 px-4 md:px-8 py-8 md:py-12">
          <div className="heading text-center md:text-5xl mb-8 ">
            <h1>TODAY'S OVERVIEW</h1>
          </div>
          <div className="box flex flex-wrap md:pl-10 ">
            <div
              className="partition-box bg-gray-900 rounded-lg p-8 m-4 flex items-center justify-center border"
              style={{ backgroundColor: "#1E293B" }}
            >
              <div>
                <img
                  src={scatterdCloud}
                  alt="Weather"
                  className="w-24 h-24 filter brightness-0 invert"
                />
              </div>
              <div className="current-day ml-4">
                <div className="p-2">
                  <h1 className="text-2xl font-bold">
                    {(weatherData.main.temp - 273.15).toFixed(2)} °C
                  </h1>
                </div> 
                  <div className="text-left pl-2">
                    <p>{weatherData.weather[0].main}</p>
                  </div>
                <div>
                  <div className="location flex items-center p-2">
                    <span className="icons">
                      <MdPlace />
                    </span>
                    <span>{weatherData.name}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="partition-box2 bg-gray-900 rounded-lg p-8 m-4 flex flex-col justify-center"
              style={{ backgroundColor: "#1E293B" }}
            >
              <WeatherComponentBox
                icon={visibilityIcon}
                detailTitle="Visibility"
                detailValue={`${weatherData.visibility} meters`}
              />
              <WeatherComponentBox
                icon={sunriseIcon}
                detailTitle="Sunrise"
                detailValue={new Date(
                  weatherData.sys.sunrise * 1000
                ).toLocaleTimeString()}
              />
              <WeatherComponentBox
                icon={sunsetIcon}
                detailTitle="Sunset"
                detailValue={new Date(
                  weatherData.sys.sunset * 1000
                ).toLocaleTimeString()}
              />
            </div>
            <div
              className="partition-box2 bg-gray-900 rounded-lg p-8 m-4 flex flex-col justify-center"
              style={{ backgroundColor: "#1E293B" }}
            >
              <WeatherComponentBox
                icon={windIcon}
                detailTitle="Wind Speed"
                detailValue={`${weatherData.wind.speed} m/s`}
              />
              <WeatherComponentBox
                icon={humidityIcon}
                detailTitle="Humidity"
                detailValue={`${weatherData.main.humidity} %`}
              />
              <WeatherComponentBox
                icon={pressureIcon}
                detailTitle="Pressure"
                detailValue={`${weatherData.main.pressure} hPa`}
              />
            </div>
            <div
              className="partition-box2 bg-gray-900 rounded-lg p-8 m-4 flex flex-col justify-center"
              style={{ backgroundColor: "#1E293B" }}
            >
              <WeatherComponentBox
                icon={feelLikeIcon}
                detailTitle="Feels Like"
                detailValue={`${(
                  weatherData.main.feels_like - 273.15
                ).toFixed(2)} °C`}
              />
              <WeatherComponentBox
                icon={minTempIcon}
                detailTitle="Min Temp"
                detailValue={`${(
                  weatherData.main.temp_min - 273.15
                ).toFixed(2)} °C`}
              />
              <WeatherComponentBox
                icon={maxTempIcon}
                detailTitle="Max Temp"
                detailValue={`${(
                  weatherData.main.temp_max - 273.15
                ).toFixed(2)} °C`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
