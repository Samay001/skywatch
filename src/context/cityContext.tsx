import React, { useState, createContext, useContext, ReactNode } from "react";

// Define the type for city data
interface CityData {
  cityName: string;
  latitude: number | null;
  longitude: number | null;
}

// Create a context with the type of city data
interface CityContextType {
  clickedCityData: CityData | null;
  setClickedCityData: React.Dispatch<React.SetStateAction<CityData | null>>;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

// Custom hook to access the context
export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityContextProvider');
  }
  return context;
}

// CityContextProvider component to wrap your application
interface CityContextProviderProps {
  children: ReactNode;
}

export const CityContextProvider: React.FC<CityContextProviderProps> = ({ children }) => {
  const [clickedCityData, setClickedCityData] = useState<CityData | null>(null);

  return (
    <CityContext.Provider value={{ clickedCityData, setClickedCityData }}>
      {children}
    </CityContext.Provider>
  );
};
