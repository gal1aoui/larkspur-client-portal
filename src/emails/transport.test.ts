import assert from "node:assert/strict";
import { test } from "node:test";
import { buildEmail, senderAddress } from "./transport.ts";

test("every email gets a plain-text part", () => {
  assert.equal(buildEmail("a@b.example", "Hi", "<p>Hello<br>there</p>").text, "Hello\nthere");
});

test("the sender comes from the environment", () => {
  assert.equal(senderAddress({ EMAIL_FROM: "Orders <o@l.example>" }), "Orders <o@l.example>");
});
