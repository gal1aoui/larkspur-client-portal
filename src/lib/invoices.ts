import { formatPrice } from "./money.ts";
import { type Order, subtotal, total } from "./orders.ts";

/** The invoice a customer downloads from their order page, as plain text lines for the PDF. */
export function invoiceLines(order: Order): string[] {
  return [
    `Invoice for order ${order.number}`,
    ...order.lines.map((line) => `${line.quantity} x ${line.name}  ${formatPrice(line.quantity * line.unitPrice)}`),
    `Subtotal  ${formatPrice(subtotal(order))}`,
    `Shipping  ${formatPrice(order.shipping)}`,
    `Total  ${formatPrice(total(order))}`,
  ];
}

export function invoiceFileName(order: Order): string {
  return `larkspur-invoice-${order.number.toLowerCase()}.pdf`;
}
