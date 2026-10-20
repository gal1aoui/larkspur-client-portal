import type { Order } from "./orders.ts";
import { SAMPLE_ORDERS } from "./sample-orders.ts";

export async function findOrder(id: string): Promise<Order | undefined> {
  return SAMPLE_ORDERS.find((order) => order.id === id);
}
