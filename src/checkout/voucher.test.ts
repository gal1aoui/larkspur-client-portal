import assert from "node:assert/strict";
import { test } from "node:test";
import { redeem } from "./voucher.ts";

test("a percentage voucher takes its share of the basket", () => {
  assert.deepEqual(redeem({ code: "WELCOME10", percentOff: 10 }, 12000), { ok: true, discount: 1200 });
});

test("a voucher never takes more than the basket", () => {
  assert.deepEqual(redeem({ code: "SORRY25", amountOff: 2500 }, 1800), { ok: true, discount: 1800 });
});

test("an expired voucher is refused", () => {
  const result = redeem({ code: "SUMMER", amountOff: 500, expiresAt: "2026-09-01" }, 5000, new Date("2026-10-28"));
  assert.deepEqual(result, { ok: false, reason: "expired" });
});

test("a basket under the minimum is refused", () => {
  assert.deepEqual(redeem({ code: "BIG50", amountOff: 5000, minimum: 20000 }, 9000), { ok: false, reason: "minimum" });
});
