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

export async function getCategories() {
  return executeQuery({
    queryFn: async () => await db.query.categoriesTable.findMany({ with: { products: true } }),
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