"use server"
import { db } from '@/db';
import { ProductSchema, productSchema, productsTable } from '@/db/schema/products';
import { executeAction } from '@/db/utils/executeAction';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: ProductSchema) {
  return executeAction({
    actionFn: async () => {
      const validatedData = productSchema.parse(data);
      await db.insert(productsTable).values(validatedData);
    },
    isProtected: true,
    clientSuccessMessage: "Produk berhasil ditambahkan",
    serverErrorMessage: "Gagal menambahkan produk"
  });
}

export async function updateProduct(data: ProductSchema) {
  return executeAction({
    actionFn: async () => {
      const validatedData = productSchema.parse(data);
      if (validatedData.mode === "update") {
        await db.update(productsTable).set(validatedData).where(eq(productsTable.id, validatedData.id));
      }
      revalidatePath('/products');
    },
    isProtected: true,
    clientSuccessMessage: "Product updated successfully",
    serverErrorMessage: "Error updating product"
  });
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  return executeAction({
    actionFn: async () => {
      const { data } = await supabase.from("products").delete().eq("id", (id as string)).select();
      if (data && data.length === 0) {
        throw new Error("Anda tidak punya akses untuk menghapus produk");
      }
      console.log(data);
      revalidatePath("/products");
    },
    isProtected: true,
    clientSuccessMessage: "Product Berhasil dihapus",
    serverErrorMessage: "Gagal menghapus product",
  });
}