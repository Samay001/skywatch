import React, { useState } from 'react';
import axios from 'axios';

const Geolocation: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  console.log(process.env.REACT_APP_API_KEY);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
          fetchCityName(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchCityName = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`);
      setCityName(response.data.name);
    } 
    catch (error) {
      setError('Error fetching city name.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={getLocation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Get Location
      </button>
      {cityName && (
        <div className="mt-4">
          {/* <h2>Your Location:</h2> */}
          <p>City: {cityName}</p>
        </div>
      )}
      {error && (
        <div className="mt-4">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default Geolocation;
