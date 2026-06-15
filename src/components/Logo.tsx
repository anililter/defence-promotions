import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
      fill="none"
    >
      {/* Outer circle */}
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      
      {/* Inner circle */}
      <circle
        cx="100"
        cy="100"
        r="66"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      
      {/* Center Vertical Line */}
      <line
        x1="100"
        y1="72"
        x2="100"
        y2="128"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Center Letters */}
      <text
        x="84"
        y="112"
        fontFamily="var(--font-inter), system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="34"
        fill="currentColor"
        textAnchor="end"
        letterSpacing="-1"
      >
        D
      </text>
      <text
        x="116"
        y="112"
        fontFamily="var(--font-inter), system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="34"
        fill="currentColor"
        textAnchor="start"
        letterSpacing="-1"
      >
        A
      </text>
      
      {/* Path for text along curve */}
      <defs>
        {/* Clockwise arc path for top text */}
        <path
          id="logoTextPathTop"
          d="M 22 100 A 78 78 0 0 1 178 100"
          fill="none"
        />
      </defs>
      
      {/* Circular text */}
      <text
        fontFamily="var(--font-inter), system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="10.5"
        fill="currentColor"
        letterSpacing="4.8"
      >
        <textPath href="#logoTextPathTop" startOffset="50%" textAnchor="middle">
          DEFENCE &amp; ATHLETICS CLUB
        </textPath>
      </text>
      
      {/* Side dots */}
      <circle cx="23" cy="106" r="3" fill="currentColor" />
      <circle cx="177" cy="106" r="3" fill="currentColor" />
    </svg>
  );
}
