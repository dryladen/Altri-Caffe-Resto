"use server"
import { db } from '@/db';
import { productSchema, ProductSchema, productsTable } from '@/db/schema';
import { executeAction } from '@/db/utils/executeAction';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: ProductSchema) {
  return executeAction({
    actionFn: async () => {
      const validatedData = productSchema.parse(data);
      await db.insert(productsTable).values(validatedData);
      revalidatePath('/products');
    },
    isProtected: true,
    clientSuccessMessage: "Product created successfully",
    serverErrorMessage: "Error creating product"
  });

}
