import type { Cents } from "./money.ts";

export type Product = {
  sku: string;
  name: string;
  unitPrice: Cents;
};

export type ComparisonRow = {
  attribute: "name" | "unitPrice";
  values: (string | Cents)[];
};

export type Comparison = {
  attributes: ("name" | "unitPrice")[];
  products: Product[];
  /** Per product, in input order: true when its unitPrice is the lowest (all tied minimums). */
  lowest: boolean[];
  rows: ComparisonRow[];
};

/** Lays out two or more products side by side; columns follow input order. */
export function compareProducts(products: Product[]): Comparison {
  if (products.length < 2) {
    throw new Error("compareProducts needs at least two products");
  }

  const minPrice = Math.min(...products.map((p) => p.unitPrice));
  const lowest = products.map((p) => p.unitPrice === minPrice);

  return {
    attributes: ["name", "unitPrice"],
    products,
    lowest,
    rows: [
      { attribute: "name", values: products.map((p) => p.name) },
      { attribute: "unitPrice", values: products.map((p) => p.unitPrice) },
    ],
  };
}
