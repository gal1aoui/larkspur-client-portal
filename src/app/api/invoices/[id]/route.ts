import { invoiceFileName, invoiceLines } from "../../../../lib/invoices.ts";
import { findOrder } from "../../../../lib/store.ts";
import { renderPdf } from "../../../../lib/pdf.ts";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const order = await findOrder((await params).id);
  if (!order) return new Response("Not found", { status: 404 });
  return new Response(renderPdf(invoiceLines(order)), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoiceFileName(order)}"`,
    },
  });
}
