import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { ButtonLink } from "./ButtonLink";
import { IconPlus } from "../Icons/Icons";

describe ("ButtonLink", () => {
    test('renders buttonlink component correctly and has only required props', () => {
        const container1 = render(
            <ButtonLink
            size="medium"
            type="color"
            text="Click me"
            />
        );
        expect(container1).toMatchSnapshot();

        const container2 = render(
            <ButtonLink
            size="large"
            type="gray"
            text="Click me"
            />
        );
        expect(container2).toMatchSnapshot();
    });
    
    test('renders buttonlink component correctly, has required props and tests optional props', () => {
        const mockOnClick = jest.fn();

        const { container } = render(
            <ButtonLink
            size="medium"
            type="color"
            text="Click me"
            icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
            // url="/button"
            onclick={mockOnClick}
            />
        );
        expect(container).toMatchSnapshot();

        // fireEvent.click(container);
        // expect(mockOnClick).toHaveBeenCalled();
    });
});