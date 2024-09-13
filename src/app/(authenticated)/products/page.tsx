import { columns } from "./components/columns";
import { DataTable } from "@/components/datatable/data-table";
import ProductForm from "./components/ProductForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCategories, getProducts } from "@/lib/queries";
import { Suspense } from "react";
import ProductList from "./components/ProductList";
import TableSkeleton from "@/components/loading/TableSkeleton";

export const experimental_ppr = true;

const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<TableSkeleton />}>
        <ProductList />
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
