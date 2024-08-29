import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cart } from "@/types/dataTypes";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type CartProps = {
  carts: Cart[];
  updateCarts: () => void;
  cart: Cart;
};
const CartQuantity = ({ carts, updateCarts, cart }: CartProps) => {
  const [quantity, setQuantity] = useState(cart.quantity);
  const [totalPrice, setTotalPrice] = useState(cart.price * quantity);

  useEffect(() => {
    localStorage.setItem(
      "carts",
      JSON.stringify(
        carts.map((c) =>
          c.id === cart.id ? { ...c, quantity, totalPrice } : c
        )
      )
    );
    updateCarts;
  });

  function deleteItem() {
    const newCarts = carts.filter((c) => c.id !== cart.id);
    localStorage.setItem("carts", JSON.stringify(newCarts));
  }
  return (
    <div className="col-span-2 flex flex-col justify-between w-full">
      <div className="flex flex-col">
        <span className="text-sm font-bold">{cart.name}</span>
        <span className="text-sm">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumSignificantDigits: 6,
          }).format(totalPrice)}
        </span>
      </div>
      <div className="flex justify-between gap-14 items-end">
        <div className="flex pt-2">
          <Button
            disabled={quantity <= 1}
            variant="outline"
            className="px-2 h-fit rounded-full border-amber-700"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
                setTotalPrice(cart.price * (quantity - 1));
              }
            }}
          >
            <Minus size={12} strokeWidth={4} />
          </Button>
          <Input
            type="number"
            className="text-center w-16 p-0 h-fit font-bold text-xl border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            value={quantity}
            onChange={(e) => {
              if (e.target.valueAsNumber > 0) {
                setQuantity(e.target.valueAsNumber);
                setTotalPrice(cart.price * e.target.valueAsNumber);
              }
            }}
          />
          <Button
            variant="outline"
            className="rounded-full px-2 h-fit border-amber-700"
            onClick={() => {
              setQuantity(quantity + 1);
              setTotalPrice(cart.price * (quantity + 1));
            }}
          >
            <Plus size={12} strokeWidth={3} />
          </Button>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className="px-0 py-1 h-fit items-end border-0 bg-white hover:bg-white">
            <Trash2 size={21} className="text-red-500" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ingin menghapus item ini ?</AlertDialogTitle>
              <AlertDialogDescription>
                Item ini akan dihapus dari keranjang
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex">
              <AlertDialogCancel>Tidak</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500"
                onClick={() => deleteItem()}
              >
                Iya
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CartQuantity;
