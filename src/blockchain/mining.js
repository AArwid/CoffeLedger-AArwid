export function mineBlock(block, difficulty) {
  const target = "0".repeat(difficulty);

  do {
    block.nonce += 1;
    block.hash = block.calculateHash();
  } while (!block.hash.startsWith(target));

  return block;
}
