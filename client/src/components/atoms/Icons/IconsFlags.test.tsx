import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { IconFlag } from "./IconsFlags";

describe("IconsFlags", () => {
    test('renders icon flag component correctly and has all props', () => {
        const container1 = render(
            <IconFlag
            size="small"
            language="nl"
            />
        );
        expect(container1).toMatchSnapshot();
    });
});