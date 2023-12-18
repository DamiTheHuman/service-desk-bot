import { describe ,expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Page", () => {
  test("it renders the Test page", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Test" })
    ).toBeDefined();
  });
});
