import { describe, it, expect } from "vitest";
import { Block } from "./block.js";

describe("proof-of-work mining", () => {
  it("increases the nonce while mining", () => {
    const block = new Block(1, 2000000000000, { batchId: "batch-1" });

    block.mine(1);

    expect(block.nonce).toBeGreaterThan(0);
  });

  it("mines a hash with the requested difficulty", () => {
    const block = new Block(1, 2000000000000, { batchId: "batch-1" });

    block.mine(1);

    expect(block.hash).toMatch(/^0/);
    expect(block.hash).toBe(block.calculateHash());
  });
});
