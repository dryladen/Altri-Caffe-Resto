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
import { cn } from "@/lib/utils";

type CartProps = {
  carts: Cart[];
  setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
  cart: Cart;
};
const CartQuantity = ({ carts, setCarts, cart }: CartProps) => {
  const [quantity, setQuantity] = useState(cart.quantity);
  const [totalPrice, setTotalPrice] = useState(cart.price * quantity);
  useEffect(() => {
    setTotalPrice(cart.price * quantity);
    setCarts(
      carts.map((c) => (c.id === cart.id ? { ...c, quantity, totalPrice } : c))
    );
    localStorage.setItem(
      "carts",
      JSON.stringify(
        carts.map((c) =>
          c.id === cart.id ? { ...c, quantity, totalPrice } : c
        )
      )
    );
  }, [totalPrice, quantity]);

  function deleteItem() {
    const newCarts = carts.filter((c) => c.id !== cart.id);
    setCarts(newCarts);
    localStorage.setItem("carts", JSON.stringify(newCarts));
  }
  return (
    <div className="col-span-2 flex flex-col justify-between w-60">
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
        <div className="flex w-full pt-2">
          <Button
            disabled={quantity <= 1}
            variant="outline"
            className="px-2 h-fit rounded-full border-amber-700"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            <Minus size={12} strokeWidth={4} />
          </Button>
          <Input
            type="number"
            className="text-center p-0 h-fit font-bold text-xl border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            value={quantity}
            onChange={(e) =>
              e.target.valueAsNumber > 0 && setQuantity(e.target.valueAsNumber)
            }
          />
          <Button
            variant="outline"
            className="rounded-full px-2 h-fit border-amber-700"
            onClick={() => setQuantity(quantity + 1)}
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
