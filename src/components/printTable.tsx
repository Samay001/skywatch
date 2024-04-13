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
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  // Handle click on city name
  const handleCityClick = (city: City) => {
    // Log city data
    console.log("City Name:", city.cityName);
    console.log("Latitude:", city.latitude);
    console.log("Longitude:", city.longitude);

    // Update the clicked city data in the context
    setClickedCityData(city);
    console.log("City data updated in context:", city);
    navigate("/cityWeather");
  };

  // Function to handle sorting
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sorting indicator
  const getSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "▲" : "▼";
  };

  // Sorting logic
  const sortedData = data.slice().sort((a, b) => {
    if (sortConfig === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
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
              onClick={() => requestSort("geoNameId")}
            >
              GeoName Id {getSortIndicator("geoNameId")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort("cityName")}
            >
              City Name {getSortIndicator("cityName")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort("countryName")}
            >
              Country Name {getSortIndicator("countryName")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort("population")}
            >
              Population {getSortIndicator("population")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort("latitude")}
            >
              Latitude {getSortIndicator("latitude")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => requestSort("longitude")}
            >
              Longitude {getSortIndicator("longitude")}
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-transparent divide-y divide-gray-200 overflow-y-auto">
          {/* Mapping over data to display rows */}
          {sortedData.map((city, index) => (
            <tr key={index}>
              {/* Displaying individual row cells */}
              <td className="p-2 text-white">{index + 1}</td>
              <td className="p-2 text-white">{city.geoNameId}</td>
              <td className="p-2">
                <button
                  formTarget="_blank"
                  className="text-gray-200 hover:underline focus:outline-none"
                  onClick={() => handleCityClick(city)}
                >
                  {city.cityName}
                </button>
              </td>
              <td className="p-2 text-white">{city.countryName}</td>
              <td className="p-2 text-white">{city.population}</td>
              <td className="p-2 text-white">{city.latitude}</td>
              <td className="p-2 text-white">{city.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
