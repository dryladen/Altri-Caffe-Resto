import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productsTable } from "./products";
import { ordersTable } from "./orders";

export const cartTable = pgTable("carts", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  productId: uuid("product_id")
    .notNull(),
  orderId: uuid("order_id")
    .notNull(),
  quantity: integer("quantity").notNull(),
  total: integer("total").default(0).notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const cartsRelation = relations(cartTable, ({ one }) => ({
  product: one(productsTable, { fields: [cartTable.productId], references: [productsTable.id] }),
  order: one(ordersTable, { fields: [cartTable.orderId], references: [ordersTable.id] })
}));

