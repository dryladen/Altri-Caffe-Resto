import OrderMenu from "./components/OrderMenu";
import { Suspense } from "react";
import TableSkeleton from "@/components/loading/TableSkeleton";

export default function page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <OrderMenu />
    </Suspense>
  );
}
