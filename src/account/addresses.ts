export type Address = {
  id: string;
  label: string;
  name: string;
  lines: string[];
  postcode: string;
  city: string;
  isDefault: boolean;
};

/** Saves an address; the first one, or one marked default, becomes the default for checkout. */
export function saveAddress(book: Address[], address: Address): Address[] {
  const others = book.filter((a) => a.id !== address.id);
  const makeDefault = address.isDefault || others.length === 0;
  return [...others.map((a) => (makeDefault ? { ...a, isDefault: false } : a)), { ...address, isDefault: makeDefault }];
}

export function defaultAddress(book: Address[]): Address | undefined {
  return book.find((a) => a.isDefault);
}

/** At checkout, the saved addresses in the order a customer expects: the default first. */
export function checkoutChoices(book: Address[]): Address[] {
  return [...book].sort((a, b) => Number(b.isDefault) - Number(a.isDefault) || a.label.localeCompare(b.label));
}
