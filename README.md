# CoffeLedger

CoffeLedger är en Node.js-backend för en decentraliserad logistikliggare för Fair Trade-kaffe. API:t använder Express, Vitest och SHA-256-baserad Proof of Work.

## Funktioner

- Blockchain med genesisblock, blocklänkning och validering.
- Transaktioner med `sender`, `recipient`, `batchId` och positiv `weightKg`.
- Proof of Work med Node.js inbyggda `crypto`-modul.
- Middleware som avvisar ogiltiga transaktioner med HTTP 400.
- Integrationstester med Supertest.

## Installation

```bash
npm install
```

## Konfiguration

Skapa en lokal `.env`-fil om du vill ändra serverns inställningar. `.env` finns i `.gitignore` och ska inte committas.

```env
NODE_ENV=development
PORT=4040
POW_DIFFICULTY=2
```

I testmiljön används alltid difficulty `1` så att testerna körs snabbt. I andra miljöer används `POW_DIFFICULTY`, med `2` som standard. Difficulty måste vara ett positivt heltal.

## Starta servern

```bash
npm start
```

Servern startar på `http://localhost:4040`, eller på porten i `PORT`.

För utveckling med automatisk omstart:

```bash
npm run dev
```

## API

### `GET /blockchain`

Returnerar blockchainen och väntande transaktioner.

```json
{
  "chain": [
    {
      "index": 0,
      "timestamp": 1700000000000,
      "data": "Genesis Block",
      "previousHash": "0",
      "nonce": 0,
      "hash": "..."
    }
  ],
  "pendingTransactions": []
}
```

### `POST /transactions`

Lägger till en giltig transaktion i pending-poolen.

Request:

```json
{
  "sender": "farm-a",
  "recipient": "roastery",
  "batchId": "batch-1",
  "weightKg": 25
}
```

Svar: HTTP `201`.

```json
{
  "transaction": {
    "sender": "farm-a",
    "recipient": "roastery",
    "batchId": "batch-1",
    "weightKg": 25
  }
}
```

Tomma textfält, saknat `batchId` och ett icke-positivt eller icke-numeriskt `weightKg` ger HTTP `400`.

### `POST /mine`

Bryter pending-transaktionerna till ett nytt block med Proof of Work och tömmer pending-poolen.

Svar: HTTP `200` med det nya blocket i egenskapen `block`.

## Tester

```bash
npm test
npm run test:watch
npm run coverage
```

## commits med failade tester

3449815 test: blockchain hasing behavior
url : https://github.com/AArwid/CoffeLedger-AArwid/commit/34498157aa8e084112dea3a72d64ab363e2acd73

8ec92d0 test: changing nonce, change hash
url : https://github.com/AArwid/CoffeLedger-AArwid/commit/8ec92d0b3636122f410249683d4bb4686cdfb7ae

aa1f1ea test: block added links, transaction payload
url : https://github.com/AArwid/CoffeLedger-AArwid/commit/aa1f1ea2cb8ca6779397c64ba80b82b1ffa27aad

96144af test: mining, PoW, nonce increease
url : https://github.com/AArwid/CoffeLedger-AArwid/commit/96144af4ac40648e5d3529a260d2512d2b607e83

7784c82 test: validate transaction, api integration
url : https://github.com/AArwid/CoffeLedger-AArwid/commit/7784c8279636d45c49d938ac4f19cd269a952505
