import React from 'react';

export default function index({ label, id, checked, onChange, className }) {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className={`w-4 h-4 ${className}`}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
