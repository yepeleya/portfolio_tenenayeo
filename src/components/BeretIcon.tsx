import React from 'react';

interface BeretIconProps {
  className?: string;
  size?: number;
}

export const BeretIcon: React.FC<BeretIconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Béret académique/chapeau de diplômé */}
      <g>
        {/* Base du béret */}
        <ellipse
          cx="12"
          cy="14"
          rx="10"
          ry="3"
          fill="currentColor"
          opacity="0.8"
        />
        
        {/* Corps principal du béret */}
        <path
          d="M4 14c0-4.5 3.5-8 8-8s8 3.5 8 8c0 1-0.5 2-1.5 2.5-1 0.5-2 0.5-3 0.5h-7c-1 0-2 0-3-0.5C4.5 16 4 15 4 14z"
          fill="currentColor"
        />
        
        {/* Gland du béret */}
        <circle
          cx="16"
          cy="8"
          r="1.5"
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Corde du gland */}
        <path
          d="M16 9.5c0 0.5-0.2 1-0.5 1.5-0.3 0.5-0.5 1-0.5 1.5"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.7"
        />
        
        {/* Bord du béret */}
        <ellipse
          cx="12"
          cy="13"
          rx="9"
          ry="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.6"
        />
      </g>
    </svg>
  );
};

export default BeretIcon;
