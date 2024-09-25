"use server"
import { db } from "@/db";
import { ordersTable, statusOrder } from "@/db/schema";
import { executeAction } from "@/db/utils/executeAction";
import { createClient } from "@/utils/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteOrder(id: string) {
	const supabase = createClient();
	return executeAction({
		actionFn: async () => {
			const { data } = await supabase.from("orders").delete().eq("id", id).select();
			if (data && data.length === 0) {
				throw new Error("Anda tidak punya akses untuk menghapus produk");
			}
			revalidatePath("/orders");
		},
		isProtected: true,
		clientSuccessMessage: "Pesanan Berhasil dihapus",
		serverErrorMessage: "Gagal menghapus pesanan",
	});
}

export async function updateOrderStatus(id: string, status: "pending" | "proses" | "done") {
	const supabase = createClient();
	return executeAction({
		actionFn: async () => {
			const response = await supabase.from("orders").update({ statusOrder: status }).eq("id", id).select();
			if (response.data && response.data.length === 0) {
				throw new Error("Anda tidak punya akses untuk menghapus produk");
			}
			revalidatePath("/orders");
		},
		isProtected: true,
		clientSuccessMessage: "Status Pesanan Berhasil diubah",
		serverErrorMessage: "Gagal mengubah status pesanan",
	});
}