import { getOrders } from "@/lib/queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import OrderList from "./OrderList";

const OrderMenu = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderList />
    </HydrationBoundary>
  );
};

export default OrderMenu;
