import { useEffect, useRef } from 'react';
import type { Point } from '../hooks/useGame';

interface GameBoardProps {
    snake: Point[];
    food: Point;
    gridSize: number;
    gameOver: boolean;
}

const CELL_SIZE = 20;

export const GameBoard = ({ snake, food, gridSize, gameOver }: GameBoardProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = '#1a1a1a'; // Dark background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw food
        ctx.fillStyle = '#ef4444'; // Red-500
        ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);

        // Draw snake
        ctx.fillStyle = '#22c55e'; // Green-500
        snake.forEach((segment, index) => {
            // Head is slightly different color
            if (index === 0) ctx.fillStyle = '#4ade80'; // Green-400
            else ctx.fillStyle = '#22c55e';

            ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
        });

        if (gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        }

    }, [snake, food, gridSize, gameOver]);

    return (
        <div className="border-4 border-gray-700 rounded-lg shadow-xl">
            <canvas
                ref={canvasRef}
                width={gridSize * CELL_SIZE}
                height={gridSize * CELL_SIZE}
                className="block"
            />
        </div>
    );
};
