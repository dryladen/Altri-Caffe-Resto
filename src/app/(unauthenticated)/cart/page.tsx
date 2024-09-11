"use client";
import { Cart } from "@/types/dataTypes";
import { ArrowLeft, Dot, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import CartQuantity from "./components/CartQuantity";
import { Button } from "@/components/ui/button";
import CartsMenu from "@/components/CartsMenu";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const router = useRouter();
  const getCarts = useCallback(() => {
    const cart = localStorage.getItem("carts");
    setCarts(cart ? JSON.parse(cart) : []);
  }, [carts]);

  const updateCarts = useCallback(
    (cart: Cart) => {
      localStorage.setItem(
        "carts",
        JSON.stringify(carts.map((c) => (c.id === cart.id ? cart : c)))
      );
      setCarts(carts.map((c) => (c.id === cart.id ? cart : c)));
    },
    [carts]
  );

  useEffect(() => {
    getCarts();
  }, [getCarts]);

  return (
    <CartsMenu carts={carts} getCarts={getCarts} updateCarts={updateCarts}>
      <div className="flex items-center gap-4 w-full">
        <Button
          variant={"outline"}
          className="px-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="font-bold text-xl">Keranjang</h1>
      </div>
    </CartsMenu>
  );
};

export default CartPage;
