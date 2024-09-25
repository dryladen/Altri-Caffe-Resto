"use server"
import { ProductSchema, productSchema } from '@/db/schema/products';
import { executeAction } from '@/db/utils/executeAction';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: ProductSchema) {
  const supabase = createClient();
  return executeAction({
    actionFn: async () => {
      const validatedData = productSchema.parse(data);
      const response = await supabase.from("products").insert([{
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        statusProduct: validatedData.statusProduct,
        category_id: validatedData.category_id,
      }]);
      if (response.error) {
        throw new Error("Anda tidak punya akses untuk menambahkan produk");
      }
      revalidatePath('/products');
    },
    isProtected: true,
    clientSuccessMessage: "Produk berhasil ditambahkan",
    serverErrorMessage: "Gagal menambahkan produk"
  });
}

export async function updateProduct(data: ProductSchema) {
  const supabase = createClient();
  return executeAction({
    actionFn: async () => {
      const validatedData = productSchema.parse(data);
      if (validatedData.mode === "update") {
        const { data } = await supabase.from("products").update({
          name: validatedData.name,
          description: validatedData.description,
          price: validatedData.price,
          statusProduct: validatedData.statusProduct,
          category_id: validatedData.category_id,
        }).eq("id", validatedData.id).select();
        if (data && data.length === 0) {
          throw new Error("Anda tidak punya akses untuk menghapus produk");
        }
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
      revalidatePath("/products");
    },
    isProtected: true,
    clientSuccessMessage: "Product Berhasil dihapus",
    serverErrorMessage: "Gagal menghapus product",
  });
}