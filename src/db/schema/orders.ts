import { InferSelectModel, relations, sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { cartTable } from "./carts";

const statusEnum = pgEnum("status", ["pending", "proses", "done"]);
export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  phone: text("phone").notNull(),
  status: statusEnum("status").notNull(),
  totalPayment: integer("total_payment").notNull(),
  paymentMethode: text("payment_methode").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date()),
});

export const ordersRelation = relations(ordersTable, ({ many }) => ({
  carts: many(cartTable)
}));

export const orderSchema = createInsertSchema(ordersTable, {
  username: (schema) => schema.username.min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
  phone: (schema) => schema.phone.min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
  status: (schema) => schema.status,
  totalPayment: (schema) => schema.totalPayment
    .positive({ message: "Harga tidak boleh kosong" })
    .int({ message: "Masukan angka" })
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Tentukan harga produk" })
        .positive({ message: "Harga tidak boleh kosong" })
        .int({ message: "Masukan angka" })
    ),
  paymentMethode: (schema) => schema.paymentMethode.min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
});

export type OrderSchema = z.infer<typeof orderSchema>;
export type SelectOrderModel = InferSelectModel<typeof ordersTable>;

