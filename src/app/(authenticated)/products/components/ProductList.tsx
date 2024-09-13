import { DataTable } from "@/components/datatable/data-table";
import { getCategories, getProducts } from "@/lib/queries";
import React from "react";
import { columns } from "./columns";
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

export default ProductList;
