import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { cartTable, SelectCartModel } from "./carts";
import { table } from "console";
import { InferResultType } from ".";

export const statusOrder = pgEnum("statusOrder", ["pending", "proses", "done"]);
export const ordersTable = pgTable("orders", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  username: text("username").notNull(),
  phone: text("phone").notNull(),
  statusOrder: statusOrder("statusOrder").notNull(),
  total_payment: integer("total_payment").notNull(),
  table_number: integer("table_number").notNull(),
  payment_methode: text("payment_methode").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .$onUpdate(() => new Date()),
});

export const ordersRelation = relations(ordersTable, ({ many }) => ({
  carts: many(cartTable)
}));

export const orderSchema = createInsertSchema(ordersTable, {
  username: (schema) => schema.username.min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
  phone: (schema) => schema.phone.min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
  statusOrder: (schema) => schema.statusOrder,
  table_number: (schema) => schema.table_number.positive({ message: "Nomor meja tidak boleh kosong" })
    .int({ message: "Masukan angka" })
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Tentukan harga produk" })
        .positive({ message: "Harga tidak boleh kosong" })
        .int({ message: "Masukan angka" })
    ),
  total_payment: (schema) => schema.total_payment
    .positive({ message: "Harga tidak boleh kosong" })
    .int({ message: "Masukan angka" })
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Tentukan harga produk" })
        .positive({ message: "Harga tidak boleh kosong" })
        .int({ message: "Masukan angka" })
    ),
  payment_methode: (schema) => schema.payment_methode.min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
});

export type OrderSchema = z.infer<typeof orderSchema>;
export type SelectOrderModel = InferResultType<"ordersTable", {
  carts: {
    with: {
      product: true
    }
  }
}>;

