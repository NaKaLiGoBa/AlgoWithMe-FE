import React from 'react';

export default function index({
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
  id,
  className,
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
      <label htmlFor={id} className={className}>
        {label}
      </label>
    </div>
  );
}
