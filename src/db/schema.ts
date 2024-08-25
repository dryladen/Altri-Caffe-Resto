import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  phone: text("phone").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(),
});

export const categoriesTable = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  status: text("status").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categoriesTable.id),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const ordersTable = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  username: text("username").notNull(),
  phone: text("phone").notNull(),
  status: text("status").notNull(),
  paymentMethode: text("payment_methode").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const cartTable = sqliteTable("cart", {
  id: integer("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id),
  orderId: integer("order_id")
    .notNull()
    .references(() => ordersTable.id),
  quantity: integer("quantity").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;
export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;
export type InsertOrder = typeof ordersTable.$inferInsert;
export type SelectOrder = typeof ordersTable.$inferSelect;
export type InsertCart = typeof cartTable.$inferInsert;
export type SelectCart = typeof cartTable.$inferSelect;

