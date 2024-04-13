import React from "react";
import { Routes, Route } from "react-router-dom";
import { CityContextProvider } from "./context/cityContext.tsx";
import CityTable from "./pages/cityTable.tsx";
import CityWeather from "./pages/cityWeather.tsx";
import Geolocation from "./components/geolocation.tsx";

function App() {
  return (
    <CityContextProvider>
      <Routes>
        <Route path="/" element={<CityTable />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/cityweather" element={<CityWeather />} />
      </Routes>
    </CityContextProvider>
  );
}

export default App;
