# CoffeLedger

A decentralized logistics ledger backend for Fair Trade coffee, built with Node.js, Express, and a SHA-256 based Proof of Work system.

## Project status so far

The project is in the early blockchain implementation stage. The app structure has been created, and the first core hashing behavior has been implemented and verified with tests.

The project follows a strict test-first workflow. We wrote tests before the implementation and validated the result with Vitest.

## Current implementation

- Express app scaffold created for the backend
- Route structure prepared for blockchain, transaction, and mining endpoints
- SHA-256 hashing utility implemented using Node.js crypto
- Hash behavior tested for:
  - deterministic output for identical input
  - changed input producing a different hash
  - 64-character hexadecimal hash format

## Installation

```bash
npm install
```

## Tests

```bash
npm test
npm run test:watch
```

## Start

```bash
npm start
```

## Development

```bash
npm run dev
```

## TDD commit log

- `chore: initialize node project`
- `chore: create application structure`
- `test: specify block hash behavior`
- `feat: implement block hashing`

## Short project summary

The project began with the base Node.js setup and app structure. After that, the team defined the expected blockchain hash behavior in tests before implementing the logic. The SHA-256 function now hashes block-like data deterministically and returns the required 64-character hex digest. This is the foundation for the next blockchain steps, including mining and transaction validation.
