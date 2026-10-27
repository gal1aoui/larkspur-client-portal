import type { Cents } from "../lib/money.ts";

export type Voucher = { code: string; amountOff?: Cents; percentOff?: number; minimum?: Cents; expiresAt?: string };

export type VoucherResult = { ok: true; discount: Cents } | { ok: false; reason: "expired" | "minimum" | "unknown" };

export function redeem(voucher: Voucher | undefined, basket: Cents, now = new Date()): VoucherResult {
  if (!voucher) return { ok: false, reason: "unknown" };
  if (voucher.expiresAt && new Date(voucher.expiresAt) < now) return { ok: false, reason: "expired" };
  if (voucher.minimum && basket < voucher.minimum) return { ok: false, reason: "minimum" };
  const discount = voucher.amountOff ?? Math.round((basket * (voucher.percentOff ?? 0)) / 100);
  return { ok: true, discount: Math.min(discount, basket) };
}
