import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const validTransaction = {
  sender: "farm-a",
  recipient: "roastery",
  batchId: "batch-1",
  weightKg: 25,
};

async function createTestClient() {
  const { default: app } = await import("./app.js");
  return request(app);
}

describe("blockchain API", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe("GET /blockchain", () => {
    it("returns the genesis chain and pending transactions", async () => {
      const client = await createTestClient();

      const response = await client.get("/blockchain");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.chain).toHaveLength(1);
      expect(response.body.chain[0].previousHash).toBe("0");
      expect(response.body.pendingTransactions).toEqual([]);
    });
  });

  describe("POST /transactions", () => {
    it("accepts a valid transaction and stores it as pending", async () => {
      const client = await createTestClient();

      const response = await client
        .post("/transactions")
        .send(validTransaction);

      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.transaction).toEqual(validTransaction);

      const blockchainResponse = await client.get("/blockchain");
      expect(blockchainResponse.body.pendingTransactions).toEqual([
        validTransaction,
      ]);
    });

    it.each([
      ["sender", { sender: "" }],
      ["recipient", { recipient: "" }],
      ["batchId", { batchId: "" }],
      ["weightKg missing", { weightKg: undefined }],
      ["weightKg zero", { weightKg: 0 }],
      ["weightKg negative", { weightKg: -5 }],
      ["weightKg non-numeric", { weightKg: "heavy" }],
    ])("rejects invalid %s with HTTP 400", async (_field, changes) => {
      const client = await createTestClient();
      const transaction = { ...validTransaction, ...changes };

      const response = await client.post("/transactions").send(transaction);

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("POST /mine", () => {
    it("mines pending transactions into a new block and clears the pool", async () => {
      const client = await createTestClient();
      await client.post("/transactions").send(validTransaction);

      const response = await client.post("/mine");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.block.data).toEqual([validTransaction]);
      expect(response.body.block.hash).toMatch(/^0/);

      const blockchainResponse = await client.get("/blockchain");
      expect(blockchainResponse.body.chain).toHaveLength(2);
      expect(blockchainResponse.body.pendingTransactions).toEqual([]);
    });
  });

  it("parses JSON request bodies", async () => {
    const client = await createTestClient();

    const response = await client
      .post("/transactions")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(validTransaction));

    expect(response.status).toBe(201);
  });

  it("returns HTTP 404 for unknown routes", async () => {
    const client = await createTestClient();

    const response = await client.get("/missing-route");

    expect(response.status).toBe(404);
  });
});
