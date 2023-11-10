import React from 'react';

export function True({ color, className }) {
  return (
    <svg
      width="100"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke={color}
        strokeWidth="14"
        fill="none"
      />
    </svg>
  );
}

export function False({ color }) {
  return (
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="20" x2="80" y2="80" stroke={color} strokeWidth="14" />
      <line x1="80" y1="20" x2="20" y2="80" stroke={color} strokeWidth="14" />
    </svg>
  );
}
