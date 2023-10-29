import React from 'react';
import { Link } from 'react-router-dom';

export default function index({ to, className, children }) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
