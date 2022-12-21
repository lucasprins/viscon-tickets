import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Button } from "./Button";
import { IconPlus } from "../Icons/Icons";

describe ("Button", () => {
    test('renders button component correctly and has only required props', () => {
        const container1 = render(
            <Button
            size="small"
            width="full"
            type="primary"
            text="Click me"
            />
        );
        expect(container1).toMatchSnapshot();
        
        const container2 = render(
            <Button
            size="medium"
            width="content"
            type="secondary-gray"
            text="Click me"
            />
        );
        expect(container2).toMatchSnapshot();
        
        const container3 = render(
            <Button
            size="large"
            width="full"
            type="tertiary-color"
            text="Click me"
            />
        );
        expect(container3).toMatchSnapshot();

        const container4 = render(
            <Button
            size="small"
            width="full"
            type="secondary-color"
            text="Click me"
            />
        );
        expect(container4).toMatchSnapshot();

        const container5 = render(
            <Button
            size="small"
            width="full"
            type="tertiary-gray"
            text="Click me"
            />
        );
        expect(container5).toMatchSnapshot();

        const container6 = render(
            <Button
            size="small"
            width="full"
            type="error"
            text="Click me"
            />
        );
        expect(container6).toMatchSnapshot();
    });

    test('renders button component correctly, has required props and tests optional props', () => {
        const mockOnClick = jest.fn();
    
        const { container } = render(
            <Button
            size="small"
            width="full"
            type="primary"
            text="Click me"
            icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
            // url="/button"
            onclick={mockOnClick}
            disabled={true}
            formType="button"
            />
        );
        expect(container).toMatchSnapshot();

        expect(container.querySelector("Button")).toBeDisabled();
        fireEvent.click(container);
        expect(mockOnClick).not.toHaveBeenCalled();
    });
});