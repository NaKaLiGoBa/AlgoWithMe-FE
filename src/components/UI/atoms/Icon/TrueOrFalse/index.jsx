import React from 'react';
import './styles.css';

export function True({
  color,
  className,
  animated = false,
  questionNumber = false,
  number,
}) {
  const circleClassName = animated ? 'drawCircle' : '';
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
        strokeDasharray={animated ? '220' : ''}
        strokeDashoffset={animated ? '220' : ''}
        className={circleClassName}
        fill="none"
      />
      {questionNumber && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke={animated ? 'green' : 'black'}
          strokeWidth="1px"
          dy=".3em"
        >
          Q.{number + 1}
        </text>
      )}
    </svg>
  );
}

export function False({ color, animated = false, number, questionNumber }) {
  const line1ClassName = animated ? 'drawLine1' : '';
  const line2ClassName = animated ? 'drawLine2' : '';
  return (
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="20"
        y1="20"
        x2="80"
        y2="80"
        stroke={color}
        strokeWidth="14"
        strokeDasharray={animated ? '85' : ''}
        strokeDashoffset={animated ? '85' : ''}
        className={line1ClassName}
      />
      <line
        x1="80"
        y1="20"
        x2="20"
        y2="80"
        stroke={color}
        strokeWidth="14"
        strokeDasharray={animated ? '85' : ''}
        strokeDashoffset={animated ? '85' : ''}
        className={line2ClassName}
      />
      {questionNumber && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke="black"
          strokeWidth="1px"
          dy=".3em"
        >
          Q.{number + 1}
        </text>
      )}
    </svg>
  );
}
