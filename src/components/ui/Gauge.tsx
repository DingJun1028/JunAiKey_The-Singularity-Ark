
import React from 'react';
import TrilingualText from './TrilingualText';

interface GaugeProps {
  value: number;
  label: string;
  color: string;
  size?: number;
}

const Gauge: React.FC<GaugeProps> = ({ value, label, color, size = 120 }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          stroke="var(--color-border)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-2xl font-bold fill-current text-card-foreground"
        >
          {`${Math.round(value)}%`}
        </text>
      </svg>
      <TrilingualText text={label} className="text-sm font-medium text-center text-card-foreground/70" />
    </div>
  );
};

export default Gauge;