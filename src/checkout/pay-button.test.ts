import assert from "node:assert/strict";
import { test } from "node:test";
import { payButtonState } from "./pay-button.ts";

test("Pay explains why it is disabled", () => {
  assert.equal(payButtonState({ termsAccepted: false, submitting: false }).hint, "Accept the terms above to pay");
});

test("Pay is enabled once the terms are accepted", () => {
  assert.equal(payButtonState({ termsAccepted: true, submitting: false }).disabled, false);
});
