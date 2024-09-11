import Menu from "@/components/Menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getOrders } from "@/lib/queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Image from "next/image";

export default async function Customer() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <div className="">
      {/* <Carousel opts={{ align: "start", loop: true }} className="w-full h-full p-4">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-full"
            >
              <div className="p-0 h-fit">
                <Card className="p-0 rounded-md">
                  <CardContent className="flex flex-col items-center justify-center p-0 w-full">
                    <Image
                      src={"https://picsum.photos/600/200"}
                      alt=""
                      width={600}
                      height={200}
                      className="object-cover rounded-md"
                      priority
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
      <div className="flex flex-col p-4 border shadow-sm">
        <h1 className="text-3xl font-bold text-primary">Altri Caffe & Resto</h1>
        <span className="text-gray-500 text-sm">Buka : 09.00 - 22.00</span>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Menu />
      </HydrationBoundary>
    </div>
  );
}
