/** The Pay button of the last checkout step. */
export function payButtonState(form: { termsAccepted: boolean; submitting: boolean }) {
  return { disabled: !form.termsAccepted || form.submitting, label: form.submitting ? "Paying..." : "Pay" };
}
