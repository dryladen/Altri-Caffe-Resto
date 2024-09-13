"use server"
import { db } from '@/db';
import { cartTable } from '@/db/schema';
import { orderSchema, OrderSchema, ordersTable } from '@/db/schema/orders';
import { executeQuery } from '@/db/utils/executeQuerie';
import { Cart } from '@/types/dataTypes';

export async function createOrders({ data, carts }: { data: OrderSchema, carts: Cart[] }) {
  return executeQuery({
    queryFn: async () => {
      const validatedData = orderSchema.parse(data);
      const { orderId } = (await db.insert(ordersTable).values(validatedData).returning({ orderId: ordersTable.id }))[0];
      // insrt carts to cartTable
      await db.insert(cartTable).values(carts.map((cart) => ({
        productId: cart.id,
        orderId: orderId,
        quantity: cart.quantity,
        total: cart.totalPrice,
        note: cart.note
      })));
      return orderId;
    },
    isProtected: true,
    serverErrorMessage: "Gagal menambahkan pesanan"
  })
}