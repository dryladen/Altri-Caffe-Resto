"use server"
import { executeAction } from '@/db/utils/executeAction';
import { UserSchema } from '@/types';
import { createServerAdmin } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function createUser(data: UserSchema) {
  const supabase = createServerAdmin();
  return executeAction({
    actionFn: async () => {
      const validatedData = UserSchema.parse(data);
      const response = await supabase.auth.admin.createUser({
        email: validatedData.email,
        password: validatedData.password,
        email_confirm: true,
        user_metadata: {
          full_name: validatedData.username,
          role: validatedData.role,
        },
      });
      if (response.error) {
        throw response.error;
      }
      revalidatePath('/products');
    },
    isProtected: true,
    clientSuccessMessage: "Pengguna berhasil ditambahkan",
    serverErrorMessage: "Gagal menambahkan pengguna"
  });
}

export async function updateProduct(data: UserSchema) {
  // const supabase = createClient();
  // return executeAction({
  //   actionFn: async () => {
  //     const validatedData = UserSchema.parse(data);
  //     if (validatedData.mode === "update") {
  //       const { data } = await supabase.from("products").update({
  //         name: validatedData.name,
  //         description: validatedData.description,
  //         price: validatedData.price,
  //         statusProduct: validatedData.statusProduct,
  //         category_id: validatedData.category_id,
  //       }).eq("id", validatedData.id).select();
  //       if (data && data.length === 0) {
  //         throw new Error("Anda tidak punya akses untuk menghapus pengguna");
  //       }
  //     }
  //     revalidatePath('/products');
  //   },
  //   isProtected: true,
  //   clientSuccessMessage: "Product updated successfully",
  //   serverErrorMessage: "Error updating product"
  // });
}

export async function deleteProduct(id: string) {
  const supabase = createServerAdmin();
  return executeAction({
    actionFn: async () => {
      const { error } = await supabase.auth.admin.deleteUser(id);
      if (error) {
        throw error;
      }
      revalidatePath("/products");
    },
    isProtected: true,
    clientSuccessMessage: "Pengguna Berhasil dihapus",
    serverErrorMessage: "Gagal menghapus product",
  });
}