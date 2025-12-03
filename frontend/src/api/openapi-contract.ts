export interface Score {
    id: number;
    player_name: string;
    score: number;
    created_at: string;
}

export interface CreateScoreRequest {
    player_name: string;
    score: number;
}

const env = (import.meta as any).env || {};
export const API_BASE_URL = env.VITE_API_URL || 'http://localhost:8000';
