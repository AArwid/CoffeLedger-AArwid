import { createHash } from "crypto";
import { mineBlock } from "./mining.js";

export class Block {
  constructor(index, timestamp, data, previousHash = "0", nonce = 0) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.hash = "";
  }

  calculateHash() {
    const payload = `${this.index}${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}${this.nonce}`;
    return createHash("sha256").update(payload).digest("hex");
  }

  mine(difficulty) {
    return mineBlock(this, difficulty);
  }
}
