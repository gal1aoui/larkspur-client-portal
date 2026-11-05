import type { Cents } from "../lib/money.ts";

export type GiftCard = { code: string; balance: Cents };

/** Splits what is due between gift cards (in the order entered) and the card payment. */
export function applyGiftCards(due: Cents, cards: GiftCard[]) {
  let remaining = due;
  const used = cards.map((card) => {
    const amount = Math.min(card.balance, remaining);
    remaining -= amount;
    return { code: card.code, amount, balanceAfter: card.balance - amount };
  });
  return { used: used.filter((u) => u.amount > 0), toPay: remaining };
}

export function isValidCode(code: string): boolean {
  return /^LR-GC-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code.trim().toUpperCase());
}
