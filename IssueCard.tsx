
import React from 'react';
import { Severity } from '../types';
import type { LogIssue } from '../types';

interface IssueCardProps {
  issue: LogIssue;
}

const severityStyles: Record<Severity, { border: string; bg: string; text: string; icon: React.ReactNode }> = {
  [Severity.CRITICAL]: {
    border: 'border-red-500', bg: 'bg-red-900/20', text: 'text-red-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
  },
  [Severity.ERROR]: {
    border: 'border-orange-500', bg: 'bg-orange-900/20', text: 'text-orange-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
  },
  [Severity.WARNING]: {
    border: 'border-yellow-500', bg: 'bg-yellow-900/20', text: 'text-yellow-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.636-1.21 2.852-1.21 3.488 0l6.225 11.859c.636 1.21-.264 2.706-1.744 2.706H3.776c-1.48 0-2.38-1.496-1.744-2.706L8.257 3.099zM10 6a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1zm1 8a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" /></svg>
  },
  [Severity.INFO]: {
    border: 'border-sky-500', bg: 'bg-sky-900/20', text: 'text-sky-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
  },
  [Severity.DEBUG]: {
    border: 'border-slate-600', bg: 'bg-slate-800/20', text: 'text-slate-400',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-6h-2M4 12H2m16.65-6.65l-1.41-1.41M5.76 18.24l-1.41-1.41M18.24 5.76l-1.41 1.41M5.76 5.76l1.41 1.41" /></svg>
  },
  [Severity.UNKNOWN]: {
    border: 'border-slate-700', bg: 'bg-slate-800', text: 'text-slate-500',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 13a1 1 0 112 0v2a1 1 0 11-2 0v-2zm-1-4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
  }
};


export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const style = severityStyles[issue.severity] || severityStyles[Severity.UNKNOWN];
  
  return (
    <div className={`border-l-4 ${style.border} ${style.bg} p-4 rounded-r-lg`}>
      <div className="flex items-start space-x-3">
        <span className={`${style.text}`}>{style.icon}</span>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className={`font-semibold text-sm ${style.text}`}>{issue.severity}</p>
            <p className="text-xs text-slate-500 font-mono">Line: ~{issue.line}</p>
          </div>
          <p className="text-slate-300 mt-1 text-sm">{issue.description}</p>
          <p className="text-slate-400 mt-2 text-xs italic">
            <span className="font-semibold">Recommendation:</span> {issue.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};
