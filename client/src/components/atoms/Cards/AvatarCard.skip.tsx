import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AvatarCard } from "./AvatarCard";

describe("AvatarCard", () => {
  test("renders avatar card component correctly and has all props", () => {
    const container1 = render(
      <AvatarCard
        name="John Doe"
        subtitle="Developer"
      />
    );
    expect(container1).toMatchSnapshot();

    const container2 = render(
      <AvatarCard
        name="Jane Doe"
        subtitle="Designer"
      />
    );
    expect(container2).toMatchSnapshot();
  });
});