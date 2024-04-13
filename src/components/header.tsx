import React from 'react';
// @ts-ignore
import logo from '../assets/icons/logo.png';
import Geolocation from './geolocation.tsx';

const Header = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-8 mr-2" />
          <h3 className="text-white font-bold text-xl">SkyWatch</h3>
        </div>
        <Geolocation />
      </div>
    </nav>
  );
};

export default Header;
