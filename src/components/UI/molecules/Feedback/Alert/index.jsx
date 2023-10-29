import React from 'react';

function Alert({ type = 'info', message, className = '' }) {
  const baseClasses = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700'
  };

  const defaultClasses = `${baseClasses[type]} border p-1 rounded`;

  const combinedClasses = `${defaultClasses} ${className}`;

  return <div className={combinedClasses}>{message}</div>;
}

export default Alert;
