import assert from "node:assert/strict";
import { test } from "node:test";
import { invoiceFileName, invoiceLines } from "./invoices.ts";
import { SAMPLE_ORDERS } from "./sample-orders.ts";

const order = SAMPLE_ORDERS[0];

test("the invoice ends on the order's total, shipping included", () => {
  assert.equal(invoiceLines(order).at(-1), "Total  $130.99");
});

test("the file is named after the order", () => {
  assert.equal(invoiceFileName(order), "larkspur-invoice-lr-1042.pdf");
});
