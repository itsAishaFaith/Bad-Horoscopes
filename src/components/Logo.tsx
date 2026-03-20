import React from 'react';

export default function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <img 
      src="/Logo.png" 
      alt="Petty Fate Logo" 
      className={`object-contain ${className}`}
    />
  );
}
