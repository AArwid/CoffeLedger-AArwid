import { Block } from "./block.js";

export { sha256 } from "./hash.js";
export { Block } from "./block.js";

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    const genesis = new Block(0, Date.now(), "Genesis Block", "0", 0);
    genesis.hash = genesis.calculateHash();
    return genesis;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
    return transaction;
  }

  minePendingTransactions(difficulty = 1) {
    const latestBlock = this.getLatestBlock();
    const transactions = [...this.pendingTransactions];
    const newBlock = new Block(
      latestBlock.index + 1,
      Date.now(),
      transactions,
      latestBlock.hash,
      0,
    );

    newBlock.mine(difficulty);
    this.chain.push(newBlock);
    this.pendingTransactions = [];

    return newBlock;
  }

  isValid() {
    for (let index = 0; index < this.chain.length; index += 1) {
      const currentBlock = this.chain[index];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (index > 0) {
        const previousBlock = this.chain[index - 1];

        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
    }

    return true;
  }

  addBlock(data) {
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(
      latestBlock.index + 1,
      Date.now(),
      data,
      latestBlock.hash,
      0,
    );

    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    return newBlock;
  }
}
