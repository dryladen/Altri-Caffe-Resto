import Menu from "@/components/Menu";
import { getOrders } from "@/lib/queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

const CustomerMenu = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Menu />
    </HydrationBoundary>
  );
};

export default CustomerMenu;
