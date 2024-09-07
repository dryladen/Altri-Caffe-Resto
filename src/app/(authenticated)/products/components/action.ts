"use server"
import { db } from '@/db';
import { ProductSchema, productSchema, productsTable } from '@/db/schema/products';
import { executeAction } from '@/db/utils/executeAction';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: ProductSchema) {
  return executeAction({
    actionFn: async () => {
      const validatedData = productSchema.parse(data);
      await db.insert(productsTable).values(validatedData);
      revalidatePath('/products');
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
        await db.update(productsTable).set(validatedData).where(eq(productsTable.id, +validatedData.id));
      }
      revalidatePath('/products');
    },
    isProtected: true,
    clientSuccessMessage: "Product updated successfully",
    serverErrorMessage: "Error updating product"
  });
}

export async function deleteProduct(id: number) {
	return executeAction({
		actionFn: async () => {
			await db.delete(productsTable).where(eq(productsTable.id, id));
			revalidatePath("/products");
		},
		isProtected: true,
		clientSuccessMessage: "Product Berhasil dihapus",
		serverErrorMessage: "Gagal menghapus product",
	});
}