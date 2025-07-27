
import React from 'react';
import type { AnalysisResult } from '../types';
import { AnalysisChart } from './AnalysisChart';
import { IssueCard } from './IssueCard';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="mt-8 space-y-6 animate-pulse">
        <div className="bg-slate-800 rounded-lg p-6">
            <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
            <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-5/6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 h-64"></div>
            <div className="bg-slate-800 rounded-lg p-6 space-y-4">
                <div className="h-10 bg-slate-700 rounded w-full"></div>
                <div className="h-10 bg-slate-700 rounded w-full"></div>
                <div className="h-10 bg-slate-700 rounded w-full"></div>
            </div>
        </div>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="mt-8 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
      <strong className="font-bold">Analysis Failed: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
);


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, result }) => {
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} />;
  if (!result) return (
      <div className="mt-8 text-center text-slate-500 py-10 border-2 border-dashed border-slate-700 rounded-lg">
          <p>Analysis results will appear here.</p>
      </div>
  );

  return (
    <div className="mt-8 space-y-8">
      {/* Summary Section */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-200 mb-4">Analysis Summary</h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-300">{result.summary}</p>
        </div>
      </div>

      {/* Statistics and Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">Log Severity</h2>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 h-80 flex items-center justify-center">
                <AnalysisChart statistics={result.statistics} />
            </div>
        </div>
        <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">Detected Issues</h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {result.issues.length > 0 ? (
                    result.issues.map((issue, index) => <IssueCard key={index} issue={issue} />)
                ) : (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center text-slate-400">
                        <p>No significant issues detected in the logs.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
