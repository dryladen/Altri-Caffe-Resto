import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import OrderMenu from "./components/OrderMenu";
import { getOrders } from "@/lib/queries";
import { Suspense } from "react";
import TableSkeleton from "@/components/loading/TableSkeleton";

export const experimental_ppr = true;

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<TableSkeleton />}>
        <OrderMenu />
      </Suspense>
    </HydrationBoundary>
  );
}
