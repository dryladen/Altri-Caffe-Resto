"use server"
import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { executeAction } from "@/db/utils/executeAction";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteOrder(id: string) {
	return executeAction({
		actionFn: async () => {
			await db.delete(ordersTable).where(eq(ordersTable.id, id));
			revalidatePath("/orders");
		},
		isProtected: true,
		clientSuccessMessage: "Pesanan Berhasil dihapus",
		serverErrorMessage: "Gagal menghapus pesanan",
	});
}

export async function updateOrderStatus(id: string, status: "pending" | "proses" | "done") {
	return executeAction({
		actionFn: async () => {
			await db.update(ordersTable).set({ status }).where(eq(ordersTable.id, id));
			revalidatePath("/orders");
		},
		isProtected: true,
		clientSuccessMessage: "Status Pesanan Berhasil diubah",
		serverErrorMessage: "Gagal mengubah status pesanan",
	});
}