import { describe, test, expect } from "vitest";
import { createHash } from "crypto";
import { sha256 } from "./blockchain.js";

describe("sha256 block hashing", () => {
  test("same input produces the same hash", async () => {
    const { sha256 } = await import("./blockchain.js");

    const blockData = {
      index: 1,
      timestamp: 2000000000000,
      transactions: [{ sender: "farm-a", recipient: "roastery", weightKg: 10 }],
      previousHash: "0",
      nonce: 100,
    };

    expect(sha256(blockData)).toBe(sha256(blockData));
  });

  test("changing nonce changes the hash", async () => {
    const { sha256 } = await import("./blockchain.js");

    const original = {
      index: 1,
      timestamp: 2000000000000,
      transactions: [{ sender: "farm-a", recipient: "roastery", weightKg: 10 }],
      previousHash: "0",
      nonce: 100,
    };

    const changed = {
      ...original,
      nonce: 101,
    };

    expect(sha256(original)).not.toBe(sha256(changed));
  });

  test("result is a 64-character hexadecimal hash", async () => {
    const { sha256 } = await import("./blockchain.js");

    const hash = sha256({
      index: 1,
      timestamp: 1720000000000,
      transactions: [{ sender: "farm-a", recipient: "roastery", weightKg: 10 }],
      previousHash: "0",
      nonce: 40,
    });

    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });
});
