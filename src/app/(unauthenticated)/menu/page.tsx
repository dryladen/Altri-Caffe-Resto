import MenuOrder from "./components/MenuOrder";
import { getCategories } from "@/lib/queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MenuOrder />
    </HydrationBoundary>
  );
}
