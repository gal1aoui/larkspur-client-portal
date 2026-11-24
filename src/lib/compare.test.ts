import assert from "node:assert/strict";
import { test } from "node:test";
import { compareProducts } from "./compare.ts";

const kettle = { sku: "K-1", name: "Kettle", unitPrice: 4599 };
const toaster = { sku: "T-2", name: "Toaster", unitPrice: 3950 };
const blender = { sku: "B-3", name: "Blender", unitPrice: 6200 };

test("lays out columns in input order", () => {
  const result = compareProducts([kettle, toaster, blender]);
  assert.deepEqual(result.products, [kettle, toaster, blender]);
  assert.deepEqual(result.rows, [
    { attribute: "name", values: ["Kettle", "Toaster", "Blender"] },
    { attribute: "unitPrice", values: [4599, 3950, 6200] },
  ]);
});

test("marks the lowest unitPrice", () => {
  const result = compareProducts([kettle, toaster, blender]);
  assert.deepEqual(result.lowest, [false, true, false]);
});

test("marks every tied minimum", () => {
  const result = compareProducts([
    kettle,
    { sku: "T-9", name: "Twin", unitPrice: 4599 },
    blender,
  ]);
  assert.deepEqual(result.lowest, [true, true, false]);
});

test("throws when fewer than two products are given", () => {
  assert.throws(() => compareProducts([kettle]), /at least two products/);
  assert.throws(() => compareProducts([]), /at least two products/);
});
