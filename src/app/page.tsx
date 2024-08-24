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
import { ListFilter, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
        <h2 className="font-bold text-2xl mb-2">Pilih Menu</h2>
        <div className="flex">
          <Input
            placeholder="Cari menu..."
            className="h-12 w-full  lg:w-[250px] font-medium"
          />
          <Button variant="outline" className="h-12 ml-2">
            <ListFilter size={24} />
          </Button>
        </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md ">
          <div className="flex py-4 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex items-center gap-1 p-2"
              >
                <span className="font-medium font-sans text-sm p-0">
                  Menu {index + 1}
                </span>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Separator className="my-2" />
        <h4 className="font-bold text-lg text-gray-600">Rekomendasi</h4>
        <Separator className="my-2" />
        <div className="w-full grid grid-cols-2 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} className="border-0 bg-inherit shadow-none">
              <CardHeader className="text-lg font-semibold p-0 rounded-sm shadow-none">
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  width={200}
                  height={300}
                  className="rounded-md"
                />
              </CardHeader>
              <CardContent className="flex flex-col items-start p-0 py-2">
                <span className="text-xs font-semibold text-foreground">
                  Menu Rekomendasi {index + 1}
                </span>
                <span className="font-medium font-sans text-sm">
                  Rp. 50.000,00
                </span>
              </CardContent>
              <CardFooter className="flex justify-between w-full p-0">
                <Button
                  variant={"outline"}
                  className="w-full flex gap-2 p-0 text-blue-600 border-blue-600 rounded-full"
                >
                  <ShoppingCart size={16} />
                  <span className="font-bold">Tambah</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
