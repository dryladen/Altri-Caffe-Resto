import { DataTable } from "@/components/datatable/data-table";
import { getAllCategories, getCategories, getProducts } from "@/lib/queries";
import React from "react";
import { columnsCategory } from "./columns";
import ProductForm from "./ProductForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const CategoryList = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const data = await getAllCategories();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTable title="Kategori" searchPlaceholder="nama kategori" columns={columnsCategory} data={data || []}>
      </DataTable>
    </HydrationBoundary>
  );
};

export default CategoryList;
