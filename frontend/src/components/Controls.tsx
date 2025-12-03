
import type { Direction } from '../hooks/useGame';

interface ControlsProps {
    onChangeDirection: (dir: Direction) => void;
}

export const Controls = ({ onChangeDirection }: ControlsProps) => {
    return (
        <div className="grid grid-cols-3 gap-2 mt-4">
            <div />
            <button
                onClick={() => onChangeDirection('UP')}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded text-white text-xl"
            >
                ↑
            </button>
            <div />
            <button
                onClick={() => onChangeDirection('LEFT')}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded text-white text-xl"
            >
                ←
            </button>
            <button
                onClick={() => onChangeDirection('DOWN')}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded text-white text-xl"
            >
                ↓
            </button>
            <button
                onClick={() => onChangeDirection('RIGHT')}
                className="bg-gray-700 hover:bg-gray-600 p-4 rounded text-white text-xl"
            >
                →
            </button>
        </div>
    );
};
