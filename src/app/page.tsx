import Menu from "@/components/Menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const categories = await db.query.categoriesTable.findMany({
    with: {
      products: true,
    },
  });
  return (
    <div className="md:px-60">
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
      <Menu categories={categories} />
    </div>
  );
}
