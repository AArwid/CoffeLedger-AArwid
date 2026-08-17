import { createHash } from "crypto";

export function sha256(data) {
  const payload = typeof data === "string" ? data : JSON.stringify(data);
  return createHash("sha256").update(payload).digest("hex");
}
