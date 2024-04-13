import React from "react";
import { Routes, Route } from "react-router-dom";
import Geolocation from "./components/geolocation.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Geolocation />} />
    </Routes>
  );
}

export default App;
