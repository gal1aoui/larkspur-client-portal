import { formatPrice } from "../lib/money.ts";
import { type Order, total } from "../lib/orders.ts";
import { layout } from "./templates.ts";
import { buildEmail } from "./transport.ts";

export function orderConfirmation(order: Order, to: string) {
  const items = order.lines.map((line) => `<li>${line.quantity} x ${line.name}</li>`).join("");
  return buildEmail(
    to,
    `Your Larkspur order ${order.number}`,
    layout(`<p>Thank you for your order.</p><ul>${items}</ul><p>Total: ${formatPrice(total(order))}</p>`),
  );
}
