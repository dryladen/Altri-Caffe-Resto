import { Cart } from "@/types/dataTypes";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Dot, ShoppingCart } from "lucide-react";
import Image from "next/image";
import CartQuantity from "@/app/(unauthenticated)/cart/components/CartQuantity";
type CartProps = {
  carts: Cart[];
  getCarts: () => void;
  updateCarts: (cart: Cart) => void;
  children?: React.ReactNode;
};
const CartsMenu = ({ carts, getCarts, updateCarts, children }: CartProps) => {
  if (carts.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-bold">Keranjang Kosong</h1>
        <Link href="/">
          <Button className="mt-4">
            Kembali Belanja
          </Button>
        </Link>
      </div>
    );
  } else {
    const total = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
    return (
      <div className="flex w-full relative flex-col gap-4 p-4 min-h-screen">
        {children}
        <div className="flex flex-col gap-4 grow">
          {carts.map((cart) => (
            <div
              key={cart.id}
              className="flex flex-col shadow-md border w-full rounded-md p-4 "
            >
              <div className="flex gap-2 ">
                <Image
                  className="rounded-md bg-gray-300 "
                  src="https://picsum.photos/120/120"
                  alt="food"
                  width={120}
                  height={120}
                  priority
                />
                <CartQuantity
                  carts={carts}
                  getCart={getCarts}
                  updateCarts={updateCarts}
                  data={cart}
                />
              </div>
              {cart.note && (
                <span className="text-sm font-medium p-2 bg-gray-100 mt-4 rounded-sm text-gray-500">
                  Note : {cart.note}
                </span>
              )}
            </div>
          ))}
        </div>
        <Link
          className="flex rounded-full mt-4 sticky gap-2  right-4 left-4 bottom-4 shadow-md bg-primary z-50 py-1"
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
          <div className="flex items-center py-2 pr-4  font-bold rounded-r-full bg-primary text-white">
            <span>Checkout</span>
          </div>
        </Link>
      </div>
    );
  }
};

export default CartsMenu;
