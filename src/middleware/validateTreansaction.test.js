import { describe, expect, it, vi } from "vitest";
import validateTransaction from "./validateTransaction.js";

export const validTransaction = {
  sender: "farm-a",
  recipient: "roastery",
  batchId: "batch-1",
  weightKg: 25,
};

function createResponse() {
  const response = {};
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
}

describe("validateTransaction middleware", () => {
  it("calls next for a valid transaction", () => {
    const request = { body: validTransaction };
    const response = createResponse();
    const next = vi.fn();

    validateTransaction(request, response, next);

    expect(next).toHaveBeenCalledOnce();
    expect(response.status).not.toHaveBeenCalled();
  });

  it.each([
    ["sender", { sender: "" }],
    ["recipient", { recipient: "" }],
    ["batchId", { batchId: "" }],
    ["weightKg missing", { weightKg: undefined }],
    ["weightKg zero", { weightKg: 0 }],
    ["weightKg negative", { weightKg: -5 }],
    ["weightKg non-numeric", { weightKg: "heavy" }],
  ])("rejects invalid %s", (_field, changes) => {
    const request = { body: { ...validTransaction, ...changes } };
    const response = createResponse();
    const next = vi.fn();

    validateTransaction(request, response, next);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: "Invalid transaction",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects a request without a body", () => {
    const request = {};
    const response = createResponse();
    const next = vi.fn();

    validateTransaction(request, response, next);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: "Invalid transaction",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
