import React from 'react';
import Icon from './Icon';

const LoadingSpinner = () => {
  return (
    <div className="spinner">
        <img src="./public/gif/loading.gif" alt="loading icon" height={"300px"} width={"300px"} />
    </div>
  );
};

export default LoadingSpinner;