import { columns } from "./components/columns";
import { DataTable } from "@/components/datatable/data-table";
import ProductForm from "./components/ProductForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/lib/queries";

const page = async () => {
  const data = await getProducts();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTable columns={columns} data={data || []}>
        <ProductForm
          defaultValues={{
            mode: "create",
            name: "",
            description: "-",
            price: 0,
            status: "tersedia",
            categoryId: "",
          }}
        />
      </DataTable>
    </HydrationBoundary>
  );
};

export default page;
