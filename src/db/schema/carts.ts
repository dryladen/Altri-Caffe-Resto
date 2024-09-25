import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productsTable } from "./products";
import { ordersTable } from "./orders";
import { InferResultType } from ".";

export const cartTable = pgTable("carts", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  product_id: uuid("product_id")
    .notNull(),
  order_id: uuid("order_id")
    .notNull(),
  quantity: integer("quantity").notNull(),
  total: integer("total").default(0).notNull(),
  note: text("note"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const cartsRelation = relations(cartTable, ({ one }) => ({
  product: one(productsTable, { fields: [cartTable.product_id], references: [productsTable.id] }),
  order: one(ordersTable, { fields: [cartTable.order_id], references: [ordersTable.id] })
}));

export type SelectCartModel = InferResultType<"cartTable", {
  product: {

  }
}>;
