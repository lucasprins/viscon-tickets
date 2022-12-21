import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Badge } from "./Badge";
import { IconPlus } from "../Icons/Icons";

describe ("Badge", () => {
    test('renders badge component correctly and has only required props', () => {
        const container1 = render(
            <Badge
            size="sm"
            color="primary"
            text="Badge"
            />
        );
        expect(container1).toMatchSnapshot();
        
        const container2 = render(
            <Badge
            size="md"
            color="success"
            text="Badge"
            />
        );
        expect(container2).toMatchSnapshot();
        
        const container3 = render(
            <Badge
            size="lg"
            color="error"
            text="Badge"
            />
        );
        expect(container3).toMatchSnapshot();
    });

    test('renders badge component correctly, has required props and tests optional props', () => {
        const { container } = render(
            <Badge
            size="sm"
            color="gray"
            text="Badge"
            icon={<IconPlus size="10" color="stroke-gray-700 dark:stroke-white" fill="" />}
            />
        );
        expect(container).toMatchSnapshot();
    });
});