import { render } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { GameBoard } from '../GameBoard';
import '@testing-library/jest-dom';

describe('GameBoard', () => {
    test('renders canvas', () => {
        const props = {
            snake: [{ x: 10, y: 10 }],
            food: { x: 5, y: 5 },
            gridSize: 20,
            gameOver: false,
        };
        const { container } = render(<GameBoard {...props} />);
        const canvas = container.querySelector('canvas');
        // @ts-expect-error - jest-dom types not picked up with @jest/globals
        expect(canvas).toBeInTheDocument();
    });
});
