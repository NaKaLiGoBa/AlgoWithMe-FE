import React from 'react';

export default function index({ children, className }) {
  return <p className={className}>{children}</p>;
}
