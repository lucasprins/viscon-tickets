import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Avatar } from "./Avatar";

describe ("Avatar", () => {
    test('renders avatar component correctly and has all props', () => {
        const container1 = render(
            <Avatar
            name="John Doe"
            color="primary"
            />
        );
        expect(container1).toMatchSnapshot();
        
        const container2 = render(
            <Avatar
            name="Jane Doe"
            color="gray"
            />
        );
        expect(container2).toMatchSnapshot();
    });
});