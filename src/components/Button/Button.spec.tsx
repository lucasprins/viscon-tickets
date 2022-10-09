import { render } from "@testing-library/react";
import { Button, ButtonSize, ButtonType, ButtonWidth } from "./Button";

describe("Button", () => {
    it("renders", () => {
        const { queryAllByText } = render(<Button
            size={ButtonSize.MEDIUM}
            type={ButtonType.PRIMARY}
            text="Foobar"
            width={ButtonWidth.FULL}
        />);

        const { container } = render(<Button
            size={ButtonSize.MEDIUM}
            type={ButtonType.PRIMARY}
            text="Foo"
            width={ButtonWidth.FULL}
        />);

        expect(queryAllByText("Foobar")).toHaveLength(1);
        expect(container).toMatchSnapshot();
    });
});