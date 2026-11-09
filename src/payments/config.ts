export type PaymentsMode = "test" | "live";

/** Live keys only when the mode says live AND the key is a live one: a mix-up fails loudly. */
export function paymentsConfig(env: Record<string, string | undefined> = process.env) {
  const mode: PaymentsMode = env.PAYMENTS_MODE === "live" ? "live" : "test";
  const key = env.PAYMENTS_PUBLIC_KEY ?? "";
  if (mode === "live" && !key.startsWith("pk_live_")) {
    throw new Error("PAYMENTS_MODE is live but the key is not a live key");
  }
  return { mode, key };
}
