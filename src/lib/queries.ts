"use server";
import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuerie";
import { eq } from "drizzle-orm";

export async function getOrders() {
  return executeQuery({
    queryFn: async () => await db.query.ordersTable.findMany(),
    serverErrorMessage: "Error fetching orders",
    isProtected: true,
  });
}
