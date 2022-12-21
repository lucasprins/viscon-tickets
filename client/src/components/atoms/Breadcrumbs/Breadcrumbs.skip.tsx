import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Breadcrumbs } from "./Breadcrumbs";

describe ("Breadcrumbs", () => {
    test('renders breadcrumbs component correctly and has only required props', () => {
        const container1 = render(
            <Breadcrumbs
            crumbs={["Dashboard", "Breadcrumbs"]}
            />
        );
        expect(container1).toMatchSnapshot();
        
        const container2 = render(
            <Breadcrumbs
            crumbs={["Dashboard", "Breadcrumbs", "Test"]}
            />
        );
        expect(container2).toMatchSnapshot()
    });
});