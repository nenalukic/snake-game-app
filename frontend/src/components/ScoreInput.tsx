import { useState } from 'react';
import { apiClient } from '../api/apiClient';

interface ScoreInputProps {
    score: number;
    onScoreSubmitted: () => void;
}

export const ScoreInput = ({ score, onScoreSubmitted }: ScoreInputProps) => {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        setError('');

        try {
            await apiClient.post('/scores', {
                player_name: name,
                score: score,
            });
            setName('');
            onScoreSubmitted();
        } catch (err) {
            console.error('Failed to submit score:', err);
            setError('Failed to submit score. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg text-white w-full max-w-md">
            <h3 className="text-xl font-bold mb-2">Submit Score</h3>
            <p className="mb-4">Your Score: <span className="text-green-400 font-mono text-xl">{score}</span></p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="p-2 rounded bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                    maxLength={20}
                    disabled={isSubmitting}
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={!name.trim() || isSubmitting}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded transition-colors"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};
