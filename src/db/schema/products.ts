import { InferSelectModel, relations, sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { categoriesTable } from "./categories";
import { cartTable } from "./carts";

const statusEnum = pgEnum("status", ["available", "unavailable"]);

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  status: statusEnum("status").notNull(),
  categoryId: integer("category_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const productsRelation = relations(productsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id]
  }),
  carts: many(cartTable)
}));

const baseSchema = createInsertSchema(productsTable, {
  name: (schema) => schema.name.min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
  description: (schema) => schema.description.max(50, "Maksimal 50 kata"),
  price: (schema) => schema.price
    .positive({ message: "Harga tidak boleh kosong" })
    .int({ message: "Masukan angka" })
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Tentukan harga produk" })
        .positive({ message: "Harga tidak boleh kosong" })
        .int({ message: "Masukan angka" })
    ),
  status: (schema) => schema.status,
  categoryId: (schema) => schema.categoryId
})

export const productSchema = z.union([
  z.object({
    mode: z.literal("create"),
    name: baseSchema.shape.name,
    description: baseSchema.shape.description,
    price: baseSchema.shape.price,
    status: baseSchema.shape.status,
    categoryId: baseSchema.shape.categoryId

  }),
  z.object({
    mode: z.literal("update"),
    id: z.number().min(1),
    name: baseSchema.shape.name,
    description: baseSchema.shape.description,
    price: baseSchema.shape.price,
    status: baseSchema.shape.status,
    categoryId: baseSchema.shape.categoryId
  })
]);

export type ProductSchema = z.infer<typeof productSchema>;
export type SelectProductModel = InferSelectModel<typeof productsTable>;