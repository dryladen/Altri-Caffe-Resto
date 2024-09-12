ALTER TABLE "carts" ADD COLUMN "total" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "note" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "table_number" integer NOT NULL;