import type { Order } from "./orders.ts";

export const SAMPLE_ORDERS: Order[] = [
  {
    id: "ord_1042",
    number: "LR-1042",
    placedAt: "2026-10-18T10:24:00Z",
    lines: [
      { sku: "MUG-GRN", name: "Stoneware mug, sage", quantity: 2, unitPrice: 1800 },
      { sku: "THR-OAT", name: "Wool throw, oatmeal", quantity: 1, unitPrice: 8900 },
    ],
    shipping: 599,
  },
];
