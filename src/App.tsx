import React from "react";
import { Routes, Route } from "react-router-dom";
import CityTable from "./pages/cityTable.tsx";
import CityWeather from "./pages/cityWeather.tsx";
import Geolocation from "./components/geolocation.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CityTable />} />
      <Route path="/geolocation" element={<Geolocation />} />
      <Route path="/cityweather" element={<CityWeather />} />
    </Routes>
  );
}

export default App;
