import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function AuthLayer({ children }) {
  const isAuthenticated = localStorage.getItem('ACCESS_TOKEN') !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

export default AuthLayer;
