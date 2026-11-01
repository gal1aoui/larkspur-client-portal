import { labelPdf } from "../../../../../returns/label.ts";

const RETURNS = new Map([
  [
    "ret_88",
    {
      id: "ret_88",
      number: "R-2088",
      orderNumber: "LR-1042",
      store: { name: "Larkspur Retail, Returns", address: ["14 Harbor Street", "Portland, OR 97204"] },
    },
  ],
]);

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const request = RETURNS.get((await params).id);
  if (!request) return new Response("Not found", { status: 404 });
  return new Response(labelPdf(request), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="return-${request.number}.pdf"` },
  });
}
