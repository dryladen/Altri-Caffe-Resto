import Menu from "@/components/Menu";
import React from "react";
import { getProducts } from "@/lib/queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const MenuOrder = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // delay 5 second
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Menu />
    </HydrationBoundary>
  );
};

export default MenuOrder;
