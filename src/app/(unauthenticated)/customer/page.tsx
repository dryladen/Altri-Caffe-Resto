import Menu from "@/components/Menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getOrders } from "@/lib/queries";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  return (
    <div className="mx-40">
      <Carousel opts={{ align: "start", loop: true }} className="w-full h-full">
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
                      src={"https://picsum.photos/600/243"}
                      alt=""
                      width={333}
                      height={343}
                      className="w-full rounded-md"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Menu />
      </HydrationBoundary>
    </div>
  );
}
