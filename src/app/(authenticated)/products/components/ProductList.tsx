import { DataTable } from "@/components/datatable/data-table";
import { getCategories, getProducts } from "@/lib/queries";
import { columnsProduct } from "./columns";
import ProductForm from "./ProductForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ProductList = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const data = await getProducts();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTable title="Produk" searchPlaceholder="nama produk" columns={columnsProduct} data={data || []}>
        <ProductForm
          defaultValues={{
            mode: "create",
            name: "",
            description: "-",
            price: 0,
            statusProduct: "tersedia",
            category_id: "",
          }}
        />
      </DataTable>
    </HydrationBoundary>
  );
};

export default ProductList;
