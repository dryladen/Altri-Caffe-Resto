import { db } from "@/db";
import FormDetails from "./components/FormDetails";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import ImageList from "./components/ImageList";

type Props = {
  params: {
    uuid: string;
  };
};
export default async function page({ params }: Props) {
  const supabase = createClient();
  const { data: productData } = await supabase
    .from("products")
    .select()
    .eq("id", params.uuid);
  const categoriesData = await db.query.categoriesTable.findMany({});
  if (!productData) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <FormDetails
        productId={params.uuid}
        defaultValues={{
          mode: "update",
          id: productData[0].id,
          name: productData[0].name,
          price: productData[0].price,
          description: productData[0].description,
          statusProduct: productData[0].statusProduct,
          category_id: productData[0].category_id,
        }}
        categoriesData={categoriesData}
      >
        <Suspense fallback="Loading...">
          <ImageList uuid={params.uuid}/>
        </Suspense>
      </FormDetails>
    </>
  );
}
