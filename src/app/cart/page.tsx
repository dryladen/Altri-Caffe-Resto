"use client";
import { Cart } from "@/types/dataTypes";
import { ArrowLeft, Dot, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartQuantity from "./components/CartQuantity";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  useEffect(() => {
    const cart = localStorage.getItem("carts");
    setCarts(cart ? JSON.parse(cart) : []);
  }, []);

  if (carts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-bold">Keranjang Kosong</h1>
        <Link href="/">
          <Button className="mt-4 bg-amber-600 hover:bg-amber-500">
            Kembali Belanja
          </Button>
        </Link>
      </div>
    );
  } else {
    const total = carts
      .map((product) => product.totalPrice)
      .reduce((acc, curr) => acc + curr);
    return (
      <div className="flex flex-col w- gap-4 pb-16 p-4">
        <div className="flex items-center gap-4 p-2 w-full">
          <Link className="" href="/">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-bold text-xl">Keranjang</h1>
        </div>
        <div className="flex flex-col gap-4">
          {carts.map((cart) => (
            <div className="flex flex-col shadow-md border w-full rounded-md p-4 ">
              <div
                key={cart.id}
                className="flex gap-4 "
              >
                <Image
                  className="rounded-md bg-gray-300"
                  src="https://picsum.photos/120/120"
                  alt="food"
                  width={120}
                  height={120}
                  priority
                />
                <CartQuantity carts={carts} setCarts={setCarts} cart={cart} />
              </div>
              {cart.note && (
                <span className="text-sm font-medium p-2 bg-gray-100 mt-4 rounded-sm text-gray-500">Note : {cart.note}</span>
              )}
            </div>
          ))}
        </div>
        <Link
          className="flex rounded-full mt-4 fixed right-4 left-4 bottom-4 shadow-md  bg-amber-600 z-50 py-1"
          href="/checkout"
        >
          <div className="flex text-white gap-2 items-center px-4 py-2 w-full">
            <ShoppingCart size={18} strokeWidth={3} />
            <div className="flex items-center">
              <span className="font-bold p-0 text-sm">{carts.length} Item</span>
              <Dot size={12} strokeWidth={5} />
              <span className="font-bold p-0">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumSignificantDigits: 6,
                }).format(total)}
              </span>
            </div>
          </div>
          <div className="flex items-center py-2 px-4 font-bold rounded-r-full bg-amber-600 text-white">
            <span>Checkout</span>
          </div>
        </Link>
      </div>
    );
  }
};

export default CartPage;
