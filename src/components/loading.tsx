import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
