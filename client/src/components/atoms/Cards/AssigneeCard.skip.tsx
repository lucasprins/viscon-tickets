import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { AssigneeCard } from "./AssigneeCard";

describe("AssigneeCard", () => {
    test('renders assignee card component correctly and has only required props', () => {
        const container1 = render(
            <AssigneeCard
                name="John Doe"
            />
        );
        expect(container1).toMatchSnapshot();

        const container2 = render(
            <AssigneeCard
                name="John Doe"
                subtitle="Subtitle"
            />
        );
        expect(container2).toMatchSnapshot();
    });
});