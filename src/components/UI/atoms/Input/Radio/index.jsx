import React from 'react';

export default function index({
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
  id,
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
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
