import { describe, it, expect } from "vitest";
import { Blockchain, Block } from "./blockchain.js";

describe("blockchain behavior", () => {
  it("creates a genesis block with previousHash 0", () => {
    const blockchain = new Blockchain();

    expect(blockchain.chain).toHaveLength(1);
    expect(blockchain.chain[0].index).toBe(0);
    expect(blockchain.chain[0].previousHash).toBe("0");
  });

  it("links a new block to the previous block hash", () => {
    const blockchain = new Blockchain();
    const first = blockchain.addBlock({
      sender: "farm-a",
      recipient: "roastery",
      weightKg: 10,
    });

    expect(first.previousHash).toBe(blockchain.chain[0].hash);
    expect(first.index).toBe(1);
  });

  it("adds transaction payloads to the chain", () => {
    const blockchain = new Blockchain();
    const tx = { sender: "farm-a", recipient: "roastery", weightKg: 25 };

    blockchain.addBlock(tx);

    expect(blockchain.chain[1].data).toEqual(tx);
  });

  it("creates blocks with a hash value", () => {
    const blockchain = new Blockchain();
    const block = blockchain.addBlock({
      sender: "roastery",
      recipient: "cafe-1",
      weightKg: 10,
    });

    expect(block.hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("returns true for a valid chain", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock({ sender: "farm-a", recipient: "roastery", weightKg: 10 });

    expect(blockchain.isValid()).toBe(true);
  });

  it("returns false when a block is tampered with", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock({ sender: "farm-a", recipient: "roastery", weightKg: 10 });
    blockchain.chain[1].data.weightKg = 99;

    expect(blockchain.isValid()).toBe(false);
  });
});