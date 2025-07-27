
export enum Severity {
  CRITICAL = 'CRITICAL',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  UNKNOWN = 'UNKNOWN'
}

export interface LogIssue {
  line: number;
  severity: Severity;
  description: string;
  recommendation: string;
}

export interface AnalysisStatistics {
  criticalCount: number;
  errorCount: number;
  warningCount: number;
  infoCount: number;
  debugCount: number;
  totalLines: number;
}

export interface AnalysisResult {
  summary: string;
  issues: LogIssue[];
  statistics: AnalysisStatistics;
}
