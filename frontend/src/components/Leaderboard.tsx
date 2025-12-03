import { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import type { Score } from '../api/openapi-contract';

export const Leaderboard = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchScores = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await apiClient.get<Score[]>('/scores');
                setScores(res.data);
            } catch (err) {
                console.error('Failed to fetch scores:', err);
                setError('Could not load leaderboard.');
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, [refreshTrigger]);

    return (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg text-white w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Leaderboard</h3>

            {loading && <p className="text-gray-400">Loading...</p>}
            {error && <p className="text-red-400">{error}</p>}

            {!loading && !error && (
                <ul className="space-y-2">
                    {scores.length === 0 ? (
                        <li className="text-gray-500 italic">No scores yet. Be the first!</li>
                    ) : (
                        scores.map((s, i) => (
                            <li key={s.id || i} className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                                <span className="flex items-center gap-2">
                                    <span className="text-gray-500 font-mono w-6">#{i + 1}</span>
                                    <span className="font-semibold">{s.player_name}</span>
                                </span>
                                <span className="text-green-400 font-mono">{s.score}</span>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};
