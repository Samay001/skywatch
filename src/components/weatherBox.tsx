import React from "react";

const WeatherBox = ({ icon, text1, text2 }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 flex items-center justify-around">
      <div className="border border-white rounded-lg p-4 font-custom text-center justify-around flex">
        {/* SVG Component */}
        <span className="mr-4">
          <img src={icon} alt="Weather Icon" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
        </span>

        {/* Texts */}
        <div className="text-left">
          <p className="text-lg font-bold mb-2 text-center">{text1}</p>
          <p className="text-center">{text2}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
