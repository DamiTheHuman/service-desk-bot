import { describe, expect, test, vi , afterEach} from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "./layout";

vi.mock("next/font/google", async () => {
  return {
    Inter: vi.fn().mockReturnValue({ className: "testFont" }),
  };
});

describe("Layout", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  test("it renders the Layout page", () => {
    const { container } = render(<RootLayout children={""} />);
    const body = container.querySelector("body");
    expect(body).toBeDefined();
  });
});
