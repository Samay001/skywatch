import React, { useState, useEffect } from "react";
import { useCity } from "../context/cityContext.tsx";
import axios from "axios";

const CityWeather = () => {
    const { clickedCityData } = useCity();
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (clickedCityData) {
                try {
                    const { latitude, longitude } = clickedCityData;
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY }`
                    );
                    setWeatherData(response.data);
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            }
        };

        fetchWeatherData();
    }, [clickedCityData]);

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-3xl mx-auto px-4">
                {clickedCityData ? (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Clicked City Data</h2>
                        <p><span className="font-semibold">City Name:</span> {clickedCityData.cityName}</p>
                        <p><span className="font-semibold">Latitude:</span> {clickedCityData.latitude}</p>
                        <p><span className="font-semibold">Longitude:</span> {clickedCityData.longitude}</p>
                    </div>
                ) : (
                    <p className="text-gray-600">No city data has been clicked yet.</p>
                )}

                {weatherData && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-2">Weather Data</h2>
                        <p><span className="font-semibold">Description:</span> {weatherData.weather[0].description}</p>
                        <p><span className="font-semibold">Temperature:</span> {weatherData.main.temp} </p>
                        {/* Add more weather data fields as needed */}
                    </div>
                )}

                {weatherData && (
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <h2 className="text-xl font-semibold mb-2">Full Weather Data</h2>
                        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CityWeather;
