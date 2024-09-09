import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { productsTable } from "./products";
import { ordersTable } from "./orders";

export const cartTable = pgTable("carts", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull(),
  orderId: integer("order_id")
    .notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const cartsRelation = relations(cartTable, ({ one }) => ({
  product: one(productsTable, { fields: [cartTable.productId], references: [productsTable.id] }),
  order: one(ordersTable, { fields: [cartTable.orderId], references: [ordersTable.id] })
}));

