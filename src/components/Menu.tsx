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
import {
  ListFilter,
  LoaderCircle,
  LoaderPinwheel,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Cart, Categories, Product } from "@/types/dataTypes";
import { AddToCart } from "./AddToCart";
import Orders from "./Orders";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/lib/queries";
import CartsMenu from "./CartsMenu";
import { Label } from "./ui/label";
import { stringify } from "querystring";

const Menu = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Fetch categories
  const { data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await getCategories();
      return categories;
    },
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getProducts();
      return products;
    },
  });
  // Get carts from local storage
  const getCarts = useCallback(() => {
    const cart = localStorage.getItem("carts");
    setCarts(cart ? JSON.parse(cart) : []);
  }, []);

  // Update carts in local storage
  const updateCarts = useCallback(
    (cart: Cart) => {
      if (carts.find((c) => c.id === cart.id)) {
        localStorage.setItem(
          "carts",
          JSON.stringify(carts.map((c) => (c.id === cart.id ? cart : c)))
        );
        setCarts(carts.map((c) => (c.id === cart.id ? cart : c)));
        getCarts();
      } else {
        localStorage.setItem("carts", JSON.stringify([...carts, cart]));
        setCarts([...carts, cart]);
        getCarts();
      }
    },
    [carts, getCarts]
  );

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  const filterdSearch = useMemo(() => {
    // search single product
    if (products && search !== "") {
      return products.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return products;
  }, [products, search]);

  const filteredCategory = useMemo(() => {
    if (data && category !== "") {
      return data.filter((data) => data.name === category);
    }
    return data;
  }, [data, category]);

  if (!filterdSearch && !data)
    return (
      <div className="flex items-center justify-center w-full h-screen gap-4">
        <LoaderCircle size={32} className="animate-spin text-blue-500" />
        <span className="font-semibold text-3xl text-primary">
          Memuat data...
        </span>
      </div>
    );
  if (filterdSearch && data && filteredCategory)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 flex flex-col w-full relative p-4 border">
          {/* <h2 className="font-bold text-2xl mb-2 text-primary">Pilih Menu</h2> */}
          <div className="flex w-full items-center border pl-2 focus-within:ring-2 focus-within:ring-ring rounded-md ">
            <Label htmlFor="search" className="text-muted-foreground">
              <Search size={21} />
            </Label>
            <Input
              id="search"
              placeholder="Cari produk..."
              className="h-10 w-full font-medium focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex w-full">
            <ScrollArea className="w-fit whitespace-nowrap rounded-md ">
              <div className="flex py-4 gap-2">
                <Button
                  variant="outline"
                  className={`flex items-center gap-1 p-2 ${
                    category === "" ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setCategory("")}
                >
                  <span className="font-medium font-sans text-sm p-0">
                    Semua
                  </span>
                </Button>
                {data.map((data: Categories) => (
                  <Button
                    key={data.name}
                    variant="outline"
                    className={`flex items-center gap-1 p-2 ${
                      category === data.name
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => setCategory(data.name)}
                  >
                    <span className="font-medium font-sans text-sm p-0">
                      {data.name}
                    </span>
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <ScrollArea className="flex flex-col w-full h-svh md:pr-4">
            {filteredCategory.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <ListFilter size={64} />
                <span className="font-semibold text-3xl text-primary">
                  Produk tidak ditemukan
                </span>
              </div>
            )}
            {filteredCategory.length !== 0 &&
              filteredCategory.map(
                (data: Categories) =>
                  // if filterdSearch data is not inside the category, return nothing
                  filterdSearch.find(
                    (item: Product) => item.categoryId === data.id
                  ) && (
                    <div key={data.id}>
                      <Separator className="my-2" />
                      <h4 className="font-bold text-lg text-primary mb-4">
                        {data.name}
                      </h4>
                      <div className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
                        {filterdSearch.map(
                          (item: any) =>
                            item.categoryId === data.id && (
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
                                      className="w-full flex gap-2 py-1 h-fit text-primary border-primary rounded-lg"
                                    >
                                      <ShoppingCart size={16} />
                                      <span className="font-bold p-0">
                                        Tambah
                                      </span>
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
          </ScrollArea>
          <Orders carts={carts} />
        </div>
        <div className="hidden w-full md:flex">
          <CartsMenu
            carts={carts}
            getCarts={getCarts}
            updateCarts={updateCarts}
          >
            <div className="flex items-center gap-4 p-2 w-full">
              <ShoppingCart size={24} />
              <h1 className="font-bold text-xl">Keranjang</h1>
            </div>
          </CartsMenu>
        </div>
      </div>
    );
};

export default Menu;
