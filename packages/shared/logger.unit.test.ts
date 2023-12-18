import { Logger } from "./logger";
import { describe, test, vitest, expect } from "vitest";

describe("logger", () => {
  test("Logs to the console when an info log is called", () => {
    const consoleSpy = vitest.spyOn(console, "log");
    new Logger().info("Info");

    expect(consoleSpy).toHaveBeenCalledWith("Info");
  });

  test("Logs to the console when a warning log is called", () => {
    const consoleSpy = vitest.spyOn(console, "warn");
    new Logger().warning("Warning");

    expect(consoleSpy).toHaveBeenCalledWith("Warning");
  });

  test("Logs to the console when an error log is called", () => {
    const consoleSpy = vitest.spyOn(console, "error");
    new Logger().error("Error");

    expect(consoleSpy).toHaveBeenCalledWith("Error");
  });
});
