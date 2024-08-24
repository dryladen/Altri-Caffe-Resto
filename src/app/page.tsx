import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { start } from "repl";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
export default function Home() {
  return (
    <>
      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-full"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-0 w-full">
                    <Image
                      src={"https://picsum.photos/333/343"}
                      alt=""
                      width={333}
                      height={343}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-col py-4">
        <h2 className="font-bold text-2xl">Pilih Menu</h2>
        <Separator className="my-4" />
        <h4 className="font-bold text-lg">Semua Menu</h4>
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 12 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-8/12 md:basis-1/2 lg:basis-4/12"
              >
                <div className="p-1">
                  <Card>
                    <CardHeader className="text-lg font-semibold p-4">
                      <Image
                        src={"https://picsum.photos/200/300"}
                        alt=""
                        width={200}
                        height={300}
                      />
                    </CardHeader>
                    <CardContent className="flex flex-col items-start px-4 py-0">
                      <span className="text-xl font-semibold">
                        Ayam bakar {index + 1}
                      </span>
                      <span>Rp. 50.000,00</span>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4">
                      <Button
                        variant={"outline"}
                        className="w-full flex gap-2 text-blue-600 border-blue-600 "
                      >
                        <ShoppingCart size={16} />
                        Tambah
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
