import cryptoJsSha256 from "crypto-js/sha256.js";

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
    return cryptoJsSha256(payload).toString();
  }
}
