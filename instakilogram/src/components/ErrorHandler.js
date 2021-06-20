import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ErrorHandler = () => {
  const errorStyle = {
    textAlign: 'center',
    padding: '10rem 2rem 0rem 2rem',
  };

  return (
    <>
      <Navbar />
      <h1 style={errorStyle}>
        You may have lost your way. This page does not exist!
      </h1>
      <Link to='/' style={errorStyle}>
        <h1>Return to instakilogram</h1>
      </Link>
    </>
  );
};

export default ErrorHandler;
