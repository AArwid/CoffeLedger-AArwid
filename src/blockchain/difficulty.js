const DEFAULT_PRODUCTION_DIFFICULTY = 2;

export function getMiningDifficulty(env = process.env) {
  if (env.NODE_ENV === "test") {
    return 1;
  }

  if (env.POW_DIFFICULTY === undefined) {
    return DEFAULT_PRODUCTION_DIFFICULTY;
  }

  const difficulty = Number(env.POW_DIFFICULTY);

  if (!Number.isInteger(difficulty) || difficulty <= 0) {
    throw new Error("POW_DIFFICULTY must be a positive integer");
  }

  return difficulty;
}
