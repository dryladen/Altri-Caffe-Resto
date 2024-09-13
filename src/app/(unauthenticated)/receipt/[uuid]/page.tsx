import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Kwitansi from "./components/Kwitansi";
import { getOrdersById } from "@/lib/queries";

type Props = {
  params: {
    uuid: string;
  };
};

const page = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["ordersById"],
    queryFn: async () => {
      const orders = await getOrdersById(params.uuid);
      return orders;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Kwitansi uuid={params.uuid} />
    </HydrationBoundary>
  );
};

export default page;
