import assert from "node:assert/strict";
import { test } from "node:test";
import { BARCODE_ROTATION, code128 } from "./barcode.ts";

test("the checksum follows the Code 128 weights", () => {
  // START B (104) + R(50)*1 + -(13)*2 + 2(18)*3 + 0(16)*4 + 8(24)*5 + 8(24)*6 = 562, 562 % 103 = 47
  assert.equal(code128("R-2088").at(-1), 47);
});

test("the barcode is drawn upside down for the thermal printers", () => {
  assert.equal(BARCODE_ROTATION, 180);
});
