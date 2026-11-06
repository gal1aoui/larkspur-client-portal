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
