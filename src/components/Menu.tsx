"use client";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ListFilter, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Cart, Categories, Product } from "@/types/dataTypes";
import { AddToCart } from "./AddToCart";
import Orders from "./Orders";
import { useCallback, useEffect, useState } from "react";
import { get } from "http";

type MenuProps = {
  categories: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    products: {
      id: number;
      name: string;
      createdAt: Date;
      updatedAt: Date | null;
      description: string;
      price: number;
      status: string;
      categoryId: number;
    }[];
  }[];
};

const Menu = ({ categories }: MenuProps) => {
  const [carts, setCarts] = useState<Cart[]>([]);

  const getCarts = useCallback(() => {
    const cart = localStorage.getItem("carts");
    setCarts(cart ? JSON.parse(cart) : []);
  }, []);

  const updateCarts = useCallback(
    (cart: Cart) => {
      if (carts.find((c) => c.id === cart.id)) {
        localStorage.setItem(
          "carts",
          JSON.stringify(carts.map((c) => (c.id === cart.id ? cart : c)))
        );
        setCarts(carts.map((c) => (c.id === cart.id ? cart : c)));
      } else {
        localStorage.setItem("carts", JSON.stringify([...carts, cart]));
        setCarts([...carts, cart]);
      }
    },
    [carts]
  );

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  return (
    <div className="flex flex-col py-4">
      <h2 className="font-bold text-2xl mb-2 text-amber-700">Pilih Menu</h2>
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
          {categories.map((item: Categories) => (
            <Button
              key={item.name}
              variant="outline"
              className="flex items-center gap-1 p-2"
            >
              <span className="font-medium font-sans text-sm p-0">
                {item.name}
              </span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {categories.map(
        (categorie: Categories) =>
          categorie.products.length > 0 && (
            <div key={categorie.id}>
              <Separator className="my-2" />
              <h4 className="font-bold text-lg text-amber-700 mb-4">
                {categorie.name}
              </h4>
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
                {categorie.products.map(
                  (item: any) =>
                    item.categoryId === categorie.id && (
                      <Card
                        key={item.id}
                        className="border-0 bg-inherit shadow-none"
                      >
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
                            {item.name}
                          </span>
                          <span className="font-medium font-sans text-sm">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumSignificantDigits: 6,
                            }).format(item.price)}
                          </span>
                        </CardContent>
                        <CardFooter className="flex justify-between w-full p-0">
                          <AddToCart
                            getCarts={getCarts}
                            updateCarts={updateCarts}
                            product={item}
                            carts={carts}
                          >
                            <Button
                              variant={"outline"}
                              className="w-full flex gap-2 py-1 h-fit text-amber-700 border-amber-700 rounded-lg"
                            >
                              <ShoppingCart size={16} />
                              <span className="font-bold p-0">Tambah</span>
                            </Button>
                          </AddToCart>
                        </CardFooter>
                      </Card>
                    )
                )}
              </div>
            </div>
          )
      )}
      <Orders carts={carts} />
    </div>
  );
};

export default Menu;
