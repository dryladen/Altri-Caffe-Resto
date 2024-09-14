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

export async function getAllCategories() {
  return executeQuery({
    queryFn: async () => await db.query.categoriesTable.findMany(),
    serverErrorMessage: "Error fetching categories",
    isProtected: true,
  });
}

export async function getCategories() {
  return executeQuery({
    queryFn: async () => await db.query.categoriesTable.findMany({ columns: { id: true, name: true } }),
    serverErrorMessage: "Error fetching categories",
    isProtected: false,
  });
}

export async function getProducts() {
  return executeQuery({
    queryFn: async () => await db.query.productsTable.findMany({ with: { category: true } }),
    serverErrorMessage: "Error fetching products",
    isProtected: false,
  });
}

export async function getOrdersById(id: string) {
  return executeQuery({
    queryFn: async () => await db.query.ordersTable.findFirst({
      where: eq(ordersTable.id, id),
      with: {
        carts: {
          with: {
            product: true
          }
        }
      }
    }),
    serverErrorMessage: "Error fetching orders",
    isProtected: true,
  });
}