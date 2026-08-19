import { describe, expect, it } from "vitest";
import { getMiningDifficulty } from "./difficulty.js";

describe("mining difficulty configuration", () => {
  it("uses difficulty 1 in the test environment", () => {
    expect(getMiningDifficulty({ NODE_ENV: "test", POW_DIFFICULTY: "3" })).toBe(
      1,
    );
  });

  it("uses POW_DIFFICULTY outside the test environment", () => {
    expect(
      getMiningDifficulty({ NODE_ENV: "production", POW_DIFFICULTY: "2" }),
    ).toBe(2);
  });

  it("uses production difficulty 2 when no value is configured", () => {
    expect(getMiningDifficulty({ NODE_ENV: "production" })).toBe(2);
  });

  it("rejects invalid production difficulty values", () => {
    expect(() =>
      getMiningDifficulty({ NODE_ENV: "production", POW_DIFFICULTY: "fast" }),
    ).toThrow("POW_DIFFICULTY must be a positive integer");
  });
});
