import React, { useState } from "react";
import { useCity } from "../context/cityContext.tsx";
import { useNavigate } from "react-router-dom";

interface City {
  geoNameId: number;
  cityName: string;
  countryName: string;
  population: number;
  longitude: number;
  latitude: number;
}

interface TableProps {
  handleSort: (attribute: string) => void;
  data: City[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  // Ensure the component is a function component
  const { setClickedCityData } = useCity();
  const navigate = useNavigate();

  // State for sorting
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'ascending' | 'descending' } | null>(null);

  // Handle click on city name
  const handleCityClick = (city: City) => {
    // Log city data
    console.log("City Name:", city.cityName);
    console.log("Latitude:", city.latitude);
    console.log("Longitude:", city.longitude);

    // Update the clicked city data in the context
    setClickedCityData(city);
    console.log("City data updated in context:", city);
    navigate("/test");
  };

  // Function to handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sorting logic
  const sortedData = data.slice().sort((a, b) => {
    if (sortConfig === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Serial No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort('geoNameId')}
            >
              GeoName Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort('cityName')}
            >
              City Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort('countryName')}
            >
              Country Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort('population')}
            >
              Population
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort('latitude')}
            >
              Latitude
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort('longitude')}
            >
              Longitude
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((city, index) => (
            <tr key={index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{city.geoNameId}</td>
              <td className="p-2">
                <button
                  formTarget="_blank"
                  className="text-blue-500 hover:underline focus:outline-none"
                  onClick={() => handleCityClick(city)}
                >
                  {city.cityName}
                </button>
              </td>
              <td className="p-2">{city.countryName}</td>
              <td className="p-2">{city.population}</td>
              <td className="p-2">{city.latitude}</td>
              <td className="p-2">{city.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
