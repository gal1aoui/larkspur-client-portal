import { renderPdf } from "../lib/pdf.ts";
import { code128 } from "./barcode.ts";

/** 4 x 6 inches, in PDF points. */
export const LABEL_SIZE = { width: 288, height: 432 };

export type ReturnRequest = { id: string; number: string; orderNumber: string; store: { name: string; address: string[] } };

/** What a return label carries: the return number, its Code 128 barcode, a QR code for drop-off and
 * the store's address. */
export function labelContent(request: ReturnRequest) {
  return {
    title: `Return ${request.number}`,
    barcode: code128(request.number),
    qr: `https://larkspur.example/returns/${request.id}`,
    address: [request.store.name, ...request.store.address],
    order: `Order ${request.orderNumber}`,
  };
}

export function labelPdf(request: ReturnRequest): Uint8Array {
  const label = labelContent(request);
  return renderPdf([label.title, label.order, `Barcode ${label.barcode.join(" ")}`, ...label.address], LABEL_SIZE);
}
