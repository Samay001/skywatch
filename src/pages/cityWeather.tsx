import React, { useState, useEffect } from "react";
import { useCity } from "../context/cityContext.tsx";
import axios from "axios";
import { Toaster, toast } from "sonner";
//@ts-ignore
// import { ReactComponent as YourSvg } from "../assets/animated/01d.svg";
import WeatherBox from "../components/weatherBox.tsx";
//@ts-ignore
import wind from "../assets/animated/wind-speed.svg";
//@ts-ignore
import humidity from "../assets/animated/humidity.svg";
//@ts-ignore
import pressure from "../assets/animated/pressure.svg";
//@ts-ignore
import visibility from "../assets/animated/visibility.svg";
//@ts-ignore
import sunrise from "../assets/animated/sunrise.svg";
//@ts-ignore
import sunset from "../assets/animated/sunset.svg";

const CityWeather = () => {
  const { clickedCityData } = useCity();
  const [weatherData, setWeatherData] = useState<any>(null);

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

  const currentDate = new Date();
  const currentDateString = currentDate.toDateString(); 
  
  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0F172A" }}
    >
      <Toaster position="top-center"/>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8"></div>
        {/* Today Overview */}
        <div className="text-5xl mb-12 font-custom text-center">
          <h1>Today Overview</h1>
        </div>
        <div className="flex flex-wrap ">
          {/* Current Weather Card */}

          <div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 rounded-lg pl-0 flex items-center border border-white justify-center "
            style={{ backgroundColor: "#4B515F" }}
          >
            {weatherData && (
              <div className="bg-opacity-25 rounded-lg  p-4 font-custom ">
                <div className="mb-4 inline-block text-white">
                  {/* <YourSvg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" /> */}
                </div>
                {/* Temperature and Description */}
                <div className="mb-4">
                  <h1 className="text-lg font-bold">
                    {(weatherData.main.temp - 273.15).toFixed(2)} °C
                  </h1>
                  <h3>{weatherData.weather[0].description}</h3>
                </div>

                {/* Location and Date */}
                <div>
                  <div className="flex items-center">
                    <div className="font-custom items-center">
                      {weatherData.name}
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="font-custom">{currentDateString}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {weatherData && (
            <div className="w-full md:w-1/2 lg:w-2/3 flex flex-wrap px-4">
              <div className="w-full font-custom border border-white rounded-lg">
                <div className="bg-white bg-opacity-25 rounded-lg p-4 flex flex-wrap justify-between">
                  <WeatherBox
                    icon={wind}
                    text1="Wind Speed"
                    text2={`${weatherData.wind.speed} m/s`}
                  />
                  <WeatherBox
                    icon={humidity}
                    text1="Humidity"
                    text2={`${weatherData.main.humidity} %`}
                  />
                  <WeatherBox
                    icon={pressure}
                    text1="Pressure"
                    text2={`${weatherData.main.pressure} hPa`}
                  />
                  <WeatherBox
                    icon={visibility}
                    text1="Visibility"
                    text2={`${weatherData.visibility} meters`}
                  />
                  <WeatherBox
                    icon={sunrise}
                    text1="Sunrise"
                    text2={new Date(
                      weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString()}
                  />
                  <WeatherBox
                    icon={sunset}
                    text1="Sunset"
                    text2={new Date(
                      weatherData.sys.sunset * 1000
                    ).toLocaleTimeString()}
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CityWeather;
