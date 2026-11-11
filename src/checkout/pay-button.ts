/** The Pay button of the last checkout step.
 *
 * CP-13: on a phone the terms checkbox sat under the sticky Pay bar, so customers could not tick it
 * and Pay stayed disabled. The bar now leaves room for it, and an unticked box is said out loud. */
export function payButtonState(form: { termsAccepted: boolean; submitting: boolean }) {
  return {
    disabled: !form.termsAccepted || form.submitting,
    label: form.submitting ? "Paying..." : "Pay",
    hint: form.termsAccepted ? null : "Accept the terms above to pay",
  };
}

/** Space the sticky Pay bar keeps free under the form on small screens, in CSS pixels. */
export const STICKY_BAR_CLEARANCE = 96;
