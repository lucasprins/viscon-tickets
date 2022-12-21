import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Divider } from './Divider';

describe('Divider', () => {
    test('renders divider component correctly', () => {
        const { container } = render(<Divider />);

        expect(container.querySelector('hr')).toBeInTheDocument();
        expect(container.querySelector('hr')).toHaveClass('w-full border-t border-gray-200 dark:border-dark-600');
    });
});