import assert from "node:assert/strict";
import { test } from "node:test";
import { LABEL_SIZE, labelContent, labelPdf } from "./label.ts";

const request = {
  id: "ret_88",
  number: "R-2088",
  orderNumber: "LR-1042",
  store: { name: "Larkspur Retail, Returns", address: ["14 Harbor Street", "Portland, OR 97204"] },
};

test("the label is a 4 x 6 inch page", () => {
  assert.deepEqual(LABEL_SIZE, { width: 288, height: 432 });
});

test("the barcode starts with Code 128 set B and carries the return number", () => {
  const { barcode } = labelContent(request);
  assert.equal(barcode[0], 104);
  assert.equal(barcode.length, "R-2088".length + 2);
});

test("the QR code opens the return", () => {
  assert.equal(labelContent(request).qr, "https://larkspur.example/returns/ret_88");
});

test("the label is a PDF", () => {
  const head = new TextDecoder().decode(labelPdf(request).slice(0, 8));
  assert.equal(head, "%PDF-1.4");
});
