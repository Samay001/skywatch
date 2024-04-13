import React, { useState } from 'react';
import axios from 'axios';
import { MapPin } from 'react-feather';

const Geolocation: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locationFetched, setLocationFetched] = useState(false);

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
      setLocationFetched(true);
    } 
    catch (error) {
      setError('Error fetching city name.');
    }
  };

  return (
    <div className="flex px-1">
      {locationFetched ? (
        cityName ? (
          <div className="mt-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-white" />
            <p className="px-1 text-white">{cityName}</p>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-red-600">City name not available</p>
          </div>
        )
      ) : (
        <button
          onClick={getLocation}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4 flex items-center"
        >
          <MapPin className="h-5 w-5 mr-2 text-white" /> 
          Get Location
        </button>
      )}
      {error && (
        <div className="mt-4">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}
    </div>
  );

};

export default Geolocation;
