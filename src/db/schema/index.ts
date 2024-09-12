import * as schema from "@/db/schema";
import { BuildQueryConfig, BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations } from "drizzle-orm";
export { categoriesTable, categoriesRelation } from "@/db/schema/categories";
export { productsTable, productsRelation, statusProduct } from "@/db/schema/products";
export { ordersTable, ordersRelation, statusOrder } from "@/db/schema/orders";
export { cartTable, cartsRelation } from "@/db/schema/carts";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelations<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelations<TableName> | undefined = undefined
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  { with: With }
>;
