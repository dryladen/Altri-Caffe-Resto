import { create } from "domain";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";


export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  phone: text("phone").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const categoriesTable = pgTable("categories", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});


export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  status: text("status").notNull(),
  categoryId: integer("category_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const ordersTable = pgTable("orders", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  username: text("username").notNull(),
  phone: text("phone").notNull(),
  status: text("status").notNull(),
  totalPayment: integer("total_payment").notNull(),
  paymentMethode: text("payment_methode").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date()),
});

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

// Relation
export const categoriesRelation = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable)
}));
export const productsRelation = relations(productsTable, ({ one }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id]
  })
}));
export const ordersRelation = relations(ordersTable, ({ many }) => ({
  carts: many(cartTable)
}));
export const cartsRelation = relations(cartTable, ({ one }) => ({
  product: one(productsTable),
  order: one(ordersTable)
}));

// type schema
export const productSchema = createInsertSchema(productsTable, {
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  price: z
    .number({ required_error: "Tentukan harga produk" })
    .positive({ message: "Harga tidak boleh kosong" })
    .int({ message: "Masukan angka" })
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Tentukan harga produk" })
        .positive({ message: "Harga tidak boleh kosong" })
        .int({ message: "Masukan angka" })
    ),
  status: z.string().min(2, "Minimal 2 kata").max(50),
  categoryId: z
    .number({ required_error: "Tentukan Kategori produk" })
    .positive({ message: "Data tidak boleh kosong" })
    .int({ message: "Masukan angka" })
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Tentukan harga produk" })
        .positive({ message: "Data tidak boleh kosong" })
        .int({ message: "Masukan angka" })
    ),
});
export type ProductSchema = z.infer<typeof productSchema>;
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
