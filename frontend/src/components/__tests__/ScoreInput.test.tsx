import { jest, describe, test, expect, afterEach } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ScoreInput } from '../ScoreInput';
import { apiClient } from '../../api/apiClient';
import '@testing-library/jest-dom';

describe('ScoreInput', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('validates empty name', () => {
        render(<ScoreInput score={10} onScoreSubmitted={jest.fn()} />);
        const button = screen.getByRole('button', { name: /submit/i });
        // @ts-expect-error - jest-dom types not picked up with @jest/globals
        expect(button).toBeDisabled();
    });

    test('submits score', async () => {
        const postSpy = jest.spyOn(apiClient, 'post').mockResolvedValue({} as never);
        const onSubmit = jest.fn();

        render(<ScoreInput score={10} onScoreSubmitted={onSubmit} />);

        const input = screen.getByPlaceholderText(/enter your name/i);
        fireEvent.change(input, { target: { value: 'TestPlayer' } });

        const button = screen.getByRole('button', { name: /submit/i });
        // @ts-expect-error - jest-dom types not picked up with @jest/globals
        expect(button).not.toBeDisabled();

        fireEvent.click(button);

        await waitFor(() => {
            expect(postSpy).toHaveBeenCalledWith('/scores', {
                player_name: 'TestPlayer',
                score: 10,
            });
            expect(onSubmit).toHaveBeenCalled();
        });
    });
});
