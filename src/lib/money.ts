/** Amounts are integers in cents; the portal never adds floating-point prices. */
export type Cents = number;

export function formatPrice(cents: Cents, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}
