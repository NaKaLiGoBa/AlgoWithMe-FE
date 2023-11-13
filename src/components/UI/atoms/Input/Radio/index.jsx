import React from 'react';

export default function index({
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
}) {
  return (
    <div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
}
