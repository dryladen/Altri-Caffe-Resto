import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import FormDetails from "./components/FormDetails";

type Props = {
  params: {
    uuid: string;
  };
};
export default async function page({ params }: Props) {
  const getProduct = await db.query.productsTable.findFirst({
    where: eq(productsTable.id, params.uuid),
  });
  const categoriesData = await db.query.categoriesTable.findMany({});
  if (!getProduct) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <FormDetails
        productId={params.uuid}
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
