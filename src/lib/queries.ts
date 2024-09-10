"use server";
import { db } from "@/db";
import { executeQuery } from "@/db/utils/executeQuerie";

export async function getOrders() {
  return executeQuery({
    queryFn: async () => await db.query.ordersTable.findMany(),
    serverErrorMessage: "Error fetching orders",
    isProtected: true,
  });
}
