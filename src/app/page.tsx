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
      <div className="flex flex-col py-4">
        <h2 className="font-bold text-2xl mb-2">Pilih Menu</h2>
        <div className="flex">
          <Input
            placeholder="Cari menu..."
            className="h-10 w-full  lg:w-[250px] font-medium"
          />
          <Button variant="outline" className="h-10 ml-2 p-2">
            <ListFilter size={24} />
          </Button>
        </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md ">
          <div className="flex py-4 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
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
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-0 bg-inherit shadow-none">
              <CardHeader className="text-lg font-semibold p-0 rounded-sm shadow-none">
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  width={200}
                  height={300}
                  className="rounded-md w-full"
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
                  className="w-full flex gap-2 py-1 h-fit text-blue-600 border-blue-600 rounded-full"
                >
                  <ShoppingCart size={16} />
                  <span className="font-bold p-0">Tambah</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Separator className="my-2" />
        <h4 className="font-bold text-lg text-gray-600">Makanan</h4>
        <Separator className="my-2" />
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-0 bg-inherit shadow-none">
              <CardHeader className="text-lg font-semibold p-0 rounded-sm shadow-none">
                <Image
                  src={"https://picsum.photos/200/300"}
                  alt=""
                  width={200}
                  height={300}
                  className="rounded-md w-full"
                />
              </CardHeader>
              <CardContent className="flex flex-col items-start p-0 py-2">
                <span className="text-xs font-semibold text-foreground">
                  Makanan {index + 1}
                </span>
                <span className="font-medium font-sans text-sm">
                  Rp. 50.000,00
                </span>
              </CardContent>
              <CardFooter className="flex justify-between w-full p-0">
                <Button
                  variant={"outline"}
                  className="w-full flex gap-2 py-1 h-fit text-blue-600 border-blue-600 rounded-full"
                >
                  <ShoppingCart size={16} />
                  <span className="font-bold p-0">Tambah</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
