import { describe, it, expect, vi, beforeEach } from "vitest";

describe("application bootstrap", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("exports an Express app without starting a server on import", async () => {
    const appModule = await import("./app.js");
    const app = appModule.default || appModule;

    expect(typeof app).toBe("function");
    expect(typeof app.listen).toBe("function");
  });

  it("starts listening only from the server entrypoint", async () => {
    const appModule = await import("./app.js");
    const app = appModule.default || appModule;
    const spy = vi.spyOn(app, "listen");

    await import("./server.js");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.any(Number), expect.any(Function));
  });
});
