import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { productsTable } from "./products";
import { ordersTable } from "./orders";

export const cartTable = pgTable("carts", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id),
  orderId: integer("order_id")
    .notNull()
    .references(() => ordersTable.id),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const cartsRelation = relations(cartTable, ({ one }) => ({
  product: one(productsTable),
  order: one(ordersTable)
}));