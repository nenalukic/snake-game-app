import { useState, useEffect, useCallback } from 'react';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Point = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const GAME_SPEED = 150;

export const useGame = () => {
    const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Point>({ x: 15, y: 10 });
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const generateFood = useCallback((currentSnake: Point[]): Point => {
        let newFood: Point;
        let isOnSnake;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            // eslint-disable-next-line no-loop-func
            isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        } while (isOnSnake);
        return newFood;
    }, []);

    const resetGame = useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        setFood(generateFood(INITIAL_SNAKE));
    }, [generateFood]);

    const changeDirection = useCallback((newDirection: Direction) => {
        setDirection(prev => {
            if (prev === 'UP' && newDirection === 'DOWN') return prev;
            if (prev === 'DOWN' && newDirection === 'UP') return prev;
            if (prev === 'LEFT' && newDirection === 'RIGHT') return prev;
            if (prev === 'RIGHT' && newDirection === 'LEFT') return prev;
            return newDirection;
        });
    }, []);

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const moveSnake = () => {
            setSnake(prevSnake => {
                const head = prevSnake[0];
                const newHead = { ...head };

                switch (direction) {
                    case 'UP': newHead.y -= 1; break;
                    case 'DOWN': newHead.y += 1; break;
                    case 'LEFT': newHead.x -= 1; break;
                    case 'RIGHT': newHead.x += 1; break;
                }

                // Check collision with walls
                if (
                    newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE
                ) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prevSnake;
                }

                // Check collision with self
                if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(s => s + 1);
                    setFood(generateFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        const interval = setInterval(moveSnake, GAME_SPEED);
        return () => clearInterval(interval);
    }, [isPlaying, gameOver, direction, food, generateFood]);

    return {
        snake,
        food,
        score,
        gameOver,
        isPlaying,
        resetGame,
        changeDirection,
        GRID_SIZE
    };
};
