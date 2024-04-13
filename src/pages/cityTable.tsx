import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/printTable.tsx";
import Layout from "../components/layout.tsx";

interface City {
  geoNameId: number;
  cityName: string;
  countryName: string;
  population: number;
  longitude: number;
  latitude: number;
}

const CityTable: React.FC = () => {
  const [cityData, setCityData] = useState<City[]>([]);
  const [filteredCityData, setFilteredCityData] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPopulation, setMinPopulation] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [fetchedIds, setFetchedIds] = useState<Set<number>>(new Set());

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${
          (page - 1) * 20
        }`
      );

      const limitedData: City[] = response.data.results.map((city: any) => ({
        geoNameId: city.geoname_id,
        cityName: city.name,
        countryName: city.cou_name_en,
        population: city.population,
        longitude: city.coordinates.lon,
        latitude: city.coordinates.lat,
      }));

      const newIds = new Set(limitedData.map((city) => city.geoNameId));
      const uniqueData = limitedData.filter(
        (city) => !fetchedIds.has(city.geoNameId)
      );

      setCityData((prev) => [...prev, ...uniqueData]);
      setFilteredCityData((prev) => [...prev, ...uniqueData]);
      setFetchedIds((prevIds) => new Set([...prevIds, ...newIds]));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterCityData(query, minPopulation, countryFilter);
  };

  const handlePopulationFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minPop = event.target.value;
    setMinPopulation(minPop);
    filterCityData(searchQuery, minPop, countryFilter);
  };

  const handleCountryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const country = event.target.value;
    setCountryFilter(country);
    filterCityData(searchQuery, minPopulation, country);
  };

  const filterCityData = (query: string, minPop: string, country: string) => {
    let filteredData = cityData.filter((city) =>
      city.cityName.toLowerCase().includes(query.toLowerCase())
    );

    if (minPop !== "") {
      filteredData = filteredData.filter(
        (city) => city.population >= parseInt(minPop)
      );
    }

    if (country !== "") {
      filteredData = filteredData.filter((city) =>
        city.countryName.toLowerCase().includes(country.toLowerCase())
      );
    }

    setFilteredCityData(filteredData);
  };

  const handleSort = (attribute: string) => {
    const sortedData = [...filteredCityData].sort((a, b) => {
      if (a[attribute] < b[attribute]) return -1;
      if (a[attribute] > b[attribute]) return 1;
      return 0;
    });

    setFilteredCityData(sortedData);
  };

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search city"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          value={minPopulation}
          onChange={handlePopulationFilter}
          placeholder="Min Population"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          value={countryFilter}
          onChange={handleCountryFilter}
          placeholder="Filter by country"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <Table data={filteredCityData} handleSort={handleSort} />
    </Layout>
  );
};

export default CityTable;
