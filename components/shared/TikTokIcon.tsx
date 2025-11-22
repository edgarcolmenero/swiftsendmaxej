import React from 'react';

interface TikTokIconProps {
  size?: number;
  className?: string;
}

/**
 * Custom TikTok icon component that matches lucide-react style
 * Simplified TikTok logo design
 */
const TikTokIcon: React.FC<TikTokIconProps> = ({ size = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* TikTok-style musical note design */}
      <path d="M9 18V5l8-1v10" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="14" r="3" />
    </svg>
  );
};

export default TikTokIcon;
