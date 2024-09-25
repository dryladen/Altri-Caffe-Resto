"use server";
import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { executeQuery } from "@/db/utils/executeQuerie";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";

export async function getOrders() {
  return executeQuery({
    queryFn: async () => await db.query.ordersTable.findMany({ with: { carts: { with: { product: true } } } }),
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

// export async function getUsers() {
//   const supabase = createClient();
//   return executeQuery({
//     serverErrorMessage: "Error fetching users",
//     isProtected: true,
//   });
// }
export async function getCategories() {
  return executeQuery({
    queryFn: async () => await db.query.categoriesTable.findMany({ columns: { id: true, name: true } }),
    serverErrorMessage: "Error fetching categories",
    isProtected: false,
  });
}

export async function getProducts() {
  return executeQuery({
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("products").select("*, categories(id, name)");
      // console.log (data)
      if (error) {
        throw error;
      }
      return data;
    },
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