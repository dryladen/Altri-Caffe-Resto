import { Suspense } from "react";
import ProductList from "./components/ProductList";
import TableSkeleton from "@/components/loading/TableSkeleton";

export const experimental_ppr = true;

const page = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProductList />
    </Suspense>
  );
};

export default page;
