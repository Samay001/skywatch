import React from "react";

const WeatherComponentBox = ({ icon, detailTitle, detailValue }) => {
return (
    <div className="weather-components flex items-center justify-center mb-4">
        <span className="icon-container mr-4 p-2">
            <img src={icon} alt="Icon" className="w-12 h-12 filter brightness-0 invert" />
        </span>
        <div className="text-container">
            <div className="detail-title p-1" style={{color:"#94A3B8"}}>
                <h1>{detailTitle}</h1>
            </div>
            <div className="p-1">
                <h1>{detailValue}</h1>
            </div>
        </div>
    </div>
);
};

export default WeatherComponentBox;


