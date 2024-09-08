import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import FormDetails from "./components/FormDetails";

type ProductFormProps = {
  params: {
    id: number;
  };
};
export default async function page({ params }: ProductFormProps) {
  const getProduct = await db.query.productsTable.findFirst({
    where: eq(productsTable.id, params.id),
  });
  const categoriesData = await db.query.categoriesTable.findMany({});
  if (!getProduct) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <FormDetails
        idProduk={params.id}
        defaultValues={{
          mode: "update",
          id: getProduct.id,
          name: getProduct.name,
          price: getProduct.price,
          description: getProduct.description,
          status: getProduct.status,
          categoryId: getProduct.categoryId,
        }}
        categoriesData={categoriesData}
      />
    </>
  );
}
