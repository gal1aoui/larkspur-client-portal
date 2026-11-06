import assert from "node:assert/strict";
import { test } from "node:test";
import { type Address, defaultAddress, saveAddress } from "./addresses.ts";

const home: Address = { id: "a1", label: "Home", name: "Rachel Kim", lines: ["221 Alder Ave"], postcode: "97205", city: "Portland", isDefault: false };
const work: Address = { ...home, id: "a2", label: "Work", lines: ["14 Harbor Street"], isDefault: true };

test("the first saved address becomes the default", () => {
  assert.equal(defaultAddress(saveAddress([], home))?.id, "a1");
});

test("a new default replaces the old one", () => {
  const book = saveAddress(saveAddress([], home), work);
  assert.deepEqual(book.filter((a) => a.isDefault).map((a) => a.id), ["a2"]);
});
