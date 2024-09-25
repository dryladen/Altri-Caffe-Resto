import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { categoriesTable } from "./categories";
import { cartTable } from "./carts";
import { InferResultType } from ".";

export const statusProduct = pgEnum("statusProduct", ["tersedia", "kosong"]);

export const productsTable = pgTable("products", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  statusProduct: statusProduct("statusProduct").notNull(),
  category_id: uuid("category_id").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const productsRelation = relations(productsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.category_id],
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
  statusProduct: (schema) => schema.statusProduct,
  category_id: (schema) => schema.category_id
})

export const productSchema = z.union([
  z.object({
    mode: z.literal("create"),
    name: baseSchema.shape.name,
    description: baseSchema.shape.description,
    price: baseSchema.shape.price,
    statusProduct: baseSchema.shape.statusProduct,
    category_id: baseSchema.shape.category_id
  }),
  z.object({
    mode: z.literal("update"),
    id: z.string().min(1),
    name: baseSchema.shape.name,
    description: baseSchema.shape.description,
    price: baseSchema.shape.price,
    statusProduct: baseSchema.shape.statusProduct,
    category_id: baseSchema.shape.category_id
  })
]);

export type ProductSchema = z.infer<typeof productSchema>;
export type SelectProductModel = InferResultType<"productsTable", {
  category: true;
}>;