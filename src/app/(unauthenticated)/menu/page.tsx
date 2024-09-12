import MenuOrder from "./components/MenuOrder";
import { getCategories, getProducts } from "@/lib/queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MenuOrder />
    </HydrationBoundary>
  );
}
