import React from 'react';

export default function index({ label, id, className }) {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className={`w-4 h-4 ${className}`}
        onChange={onchange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
