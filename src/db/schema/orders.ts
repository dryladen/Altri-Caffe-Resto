import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { cartTable } from "./carts";

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

export const ordersRelation = relations(ordersTable, ({ many }) => ({
  carts: many(cartTable)
}));