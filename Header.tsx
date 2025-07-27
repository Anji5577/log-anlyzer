
import React from 'react';

const BrainCircuitIcon: React.FC<{className?: string}> = ({className}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M12 2a10 10 0 0 0-4.32 19.14"/>
        <path d="M12 2a10 10 0 0 1 4.32 19.14"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <circle cx="12" cy="12" r="4"/>
        <path d="M4.93 4.93l1.41 1.41"/>
        <path d="M17.66 17.66l1.41 1.41"/>
        <path d="M4.93 19.07l1.41-1.41"/>
        <path d="M17.66 6.34l1.41-1.41"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
            <BrainCircuitIcon className="h-8 w-8 text-cyan-400"/>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
             AI Log Analyzer
            </h1>
        </div>
      </div>
    </header>
  );
};
