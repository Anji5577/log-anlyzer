
import React from 'react';

interface LogInputProps {
  logs: string;
  onLogsChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const LogInput: React.FC<LogInputProps> = ({ logs, onLogsChange, onAnalyze, isLoading }) => {
  return (
    <div className="space-y-4">
      <label htmlFor="log-input" className="block text-sm font-medium text-slate-400">
        Paste your system logs below
      </label>
      <textarea
        id="log-input"
        value={logs}
        onChange={(e) => onLogsChange(e.target.value)}
        placeholder={`[2024-07-29 10:00:00] INFO: Application starting...\n[2024-07-29 10:00:01] DEBUG: Database connection pool initialized with 10 connections.\n[2024-07-29 10:00:05] WARN: Configuration 'timeout' is deprecated. Use 'connectionTimeout' instead.\n[2024-07-29 10:01:23] ERROR: Failed to process message ID 12345: Connection refused.\n[2024-07-29 10:01:23] CRITICAL: Database connection lost. Attempting to reconnect...`}
        className="w-full h-64 p-4 font-mono text-sm bg-slate-800 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out text-slate-300 resize-y"
        disabled={isLoading}
      />
      <div className="flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={isLoading || !logs.trim()}
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
                <LoadingSpinner />
                Analyzing...
            </>
          ) : 'Analyze Logs'}
        </button>
      </div>
    </div>
  );
};
