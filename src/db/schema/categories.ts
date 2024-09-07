import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { productsTable } from "./products";

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const categoriesRelation = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable)
}));

const baseSchema = createInsertSchema(categoriesTable, {
  name: (schema) => schema.name.min(2, "Minimal 2 kata").max(50, "Maksimal 50 kata"),
});

export const categorySchema = z.union([
  z.object({
    mode: z.literal("create"),
    name: baseSchema.shape.name,
  }),
  z.object({
    mode: z.literal("update"),
    id: z.number().min(1, "ID tidak boleh kosong"),
    name: baseSchema.shape.name,
  }),
]);

export type CategorySchema = z.infer<typeof categorySchema>;