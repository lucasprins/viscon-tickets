import React from "react";
import { render, screen } from "@testing-library/react";
import { FeaturedIcon } from "./FeaturedIcon";
import { IconPlus } from "../Icons/Icons";

describe("FeaturedIcon", () => {
    test('renders featured icon component correctly and has all props', () => {
        const container1 = render(
            <FeaturedIcon
            size="xl"
            type="primary"
            icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
            />
        );
        expect(container1).toMatchSnapshot();
        
        const container2 = render(
            <FeaturedIcon
            size="md"
            type="gray"
            icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
            />
        );
        expect(container2).toMatchSnapshot();

        const container3 = render(
            <FeaturedIcon
            size="lg"
            type="error"
            icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
            />
        );
        expect(container3).toMatchSnapshot();
    
        const container4 = render(
            <FeaturedIcon
            size="sm"
            type="success"
            icon={<IconPlus size='20' color='stroke-gray-700 dark:stroke-white' fill='' />}
            />
        );
        expect(container4).toMatchSnapshot();
    });
});
