
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LogInput } from './components/LogInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeLogs } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!logs.trim()) {
      setError('Log input cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeLogs(logs);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, [logs]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <LogInput
            logs={logs}
            onLogsChange={setLogs}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          <ResultsDisplay
            isLoading={isLoading}
            error={error}
            result={analysisResult}
          />
        </div>
      </main>
       <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Gemini. For informational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
