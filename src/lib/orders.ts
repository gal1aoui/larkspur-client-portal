import type { Cents } from "./money.ts";

export type OrderLine = { sku: string; name: string; quantity: number; unitPrice: Cents };
export type Order = {
  id: string;
  number: string;
  placedAt: string;
  lines: OrderLine[];
  shipping: Cents;
};

export function subtotal(order: Order): Cents {
  return order.lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
}

export function total(order: Order): Cents {
  return subtotal(order) + order.shipping;
}
