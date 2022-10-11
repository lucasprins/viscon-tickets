import { render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
    it("renders", () => {
        const { queryAllByText } = render(<Button
            size='medium'
            type='primary'
            text="Foobar"
            width='full'
        />);

        const { container } = render(<Button
            size='medium'
            type='primary'
            text="Foo"
            width='full'
        />);

        expect(queryAllByText("Foobar")).toHaveLength(1);
        expect(container).toMatchSnapshot();
    });
});