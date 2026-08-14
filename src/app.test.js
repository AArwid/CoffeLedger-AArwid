import { describe, it, expect, vi, beforeEach } from "vitest";

describe("application bootstrap", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("exports an Express app without starting a server on import", async () => {
    const { default: app } = await import("./app.js");

    expect(typeof app).toBe("function");
    expect(typeof app.listen).toBe("function");
  });

  it("starts listening only from the server entrypoint", async () => {
    const listen = vi.fn();

    vi.doMock("./app.js", () => ({
      default: { listen },
    }));

    await import("./server.js?bootstrap");

    expect(listen).toHaveBeenCalledTimes(1);
    expect(listen).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Function),
    );
  });
});
