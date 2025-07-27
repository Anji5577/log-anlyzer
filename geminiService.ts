
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';
import { Severity } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A concise, high-level summary of the log analysis findings in 2-3 sentences."
        },
        issues: {
            type: Type.ARRAY,
            description: "A list of identified issues from the logs.",
            items: {
                type: Type.OBJECT,
                properties: {
                    line: {
                        type: Type.INTEGER,
                        description: "The approximate line number in the original log where the issue occurred."
                    },
                    severity: {
                        type: Type.STRING,
                        description: "The severity of the issue.",
                        enum: Object.values(Severity)
                    },
                    description: {
                        type: Type.STRING,
                        description: "A clear and concise description of the identified issue."
                    },
                    recommendation: {
                        type: Type.STRING,
                        description: "A suggested action or fix for the identified issue."
                    }
                },
                required: ["line", "severity", "description", "recommendation"],
            }
        },
        statistics: {
            type: Type.OBJECT,
            description: "A count of logs for each severity level.",
            properties: {
                criticalCount: { type: Type.INTEGER },
                errorCount: { type: Type.INTEGER },
                warningCount: { type: Type.INTEGER },
                infoCount: { type: Type.INTEGER },
                debugCount: { type: Type.INTEGER },
                totalLines: { type: Type.INTEGER, description: "Total number of lines in the provided log." },
            },
            required: ["criticalCount", "errorCount", "warningCount", "infoCount", "debugCount", "totalLines"]
        }
    },
    required: ["summary", "issues", "statistics"]
};


export const analyzeLogs = async (logs: string): Promise<AnalysisResult> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following system logs and identify any notable events.
--- LOGS START ---
${logs}
--- LOGS END ---
`,
            config: {
                systemInstruction: `You are an expert system log analysis AI. Your task is to analyze the provided system logs, identify potential issues, classify them by severity, and provide a concise summary. You must respond in the valid JSON format defined by the provided schema. For statistics, count the occurrences of each log level (critical, error, warning, info, debug) and the total number of lines. If a log entry doesn't fit a severity, do not include it in the 'issues' array but still count it in totalLines. If no issues are found, return an empty 'issues' array.`,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        // Sometimes the API might return markdown with ```json ... ```, so we strip it.
        const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
        const result: AnalysisResult = JSON.parse(cleanedJsonText);
        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to analyze logs: ${error.message}`);
        }
        throw new Error("An unknown error occurred while analyzing logs.");
    }
};
