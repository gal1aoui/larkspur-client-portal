import assert from "node:assert/strict";
import { test } from "node:test";
import { applyGiftCards, isValidCode } from "./gift-cards.ts";

test("two gift cards cover part of the order, the rest is paid by card", () => {
  const result = applyGiftCards(13099, [
    { code: "LR-GC-7K2P-9QXA", balance: 5000 },
    { code: "LR-GC-M4TT-21BD", balance: 2500 },
  ]);
  assert.equal(result.toPay, 5599);
  assert.equal(result.used.length, 2);
});

test("a card with more balance than needed keeps the rest", () => {
  const result = applyGiftCards(1800, [{ code: "LR-GC-7K2P-9QXA", balance: 5000 }]);
  assert.deepEqual(result.used, [{ code: "LR-GC-7K2P-9QXA", amount: 1800, balanceAfter: 3200 }]);
});

test("codes are checked before calling the gift card service", () => {
  assert.equal(isValidCode(" lr-gc-7k2p-9qxa "), true);
  assert.equal(isValidCode("GIFT-123"), false);
});
