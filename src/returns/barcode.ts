/** Code 128 (set B) symbol values for a text, start and checksum included (no stop). */
export function code128(text: string): number[] {
  const START_B = 104;
  const values = [...text].map((char) => char.charCodeAt(0) - 32);
  const checksum = (START_B + values.reduce((sum, value, i) => sum + value * (i + 1), 0)) % 103;
  return [START_B, ...values, checksum];
}

/** Thermal printers feed the 4 x 6 label bottom first: the barcode is drawn rotated 180 degrees so
 * it reads the right way up on the parcel (CP-10). */
export const BARCODE_ROTATION = 180;
