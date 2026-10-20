import assert from "node:assert/strict";
import { test } from "node:test";
import { formatPrice } from "./money.ts";

test("formats cents as dollars", () => {
  assert.equal(formatPrice(4599), "$45.99");
});
