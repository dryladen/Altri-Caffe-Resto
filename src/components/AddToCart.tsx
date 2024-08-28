import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, NotepadText, Plus, ShoppingCart } from "lucide-react";
import { Cart } from "@/types/dataTypes";
import React, { Children, useEffect, useState } from "react";

type AddToCartProps = {
  carts: Cart[];
  setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
  product: Cart;
  children: React.ReactNode;
};

export function AddToCart({
  carts,
  setCarts,
  product,
  children,
}: AddToCartProps) {
  function updateCart() {
    const cart = localStorage.getItem("carts");
    setCarts(cart ? JSON.parse(cart) : []);
  }
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [text_length, setTextLength] = useState(0);
  function addToCart() {
    // add cart to local storage, if cart already exist, update the quantity
    const cart = carts.find((cart) => cart.id === product.id);
    if (cart) {
      const newCart = {
        ...cart,
        note: note,
        quantity: quantity,
        totalPrice: quantity * product.price,
      };
      setCarts(carts.map((cart) => (cart.id === product.id ? newCart : cart)));
      localStorage.setItem(
        "carts",
        JSON.stringify(
          carts.map((cart) => (cart.id === product.id ? newCart : cart))
        )
      );
    } else {
      const newCart = {
        id: product.id,
        name: product.name,
        description: product.description,
        note: note,
        quantity: quantity,
        price: product.price,
        totalPrice: quantity * product.price,
      };
      setCarts([...carts, newCart]);
      localStorage.setItem("carts", JSON.stringify([...carts, newCart]));
    }
  }
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>
              <div className="grid grid-cols-2 justestre">
                <span className="justify-self-start">{product.name}</span>
                <span className="justify-self-end">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumSignificantDigits: 6,
                  }).format(product.price)}
                </span>
              </div>
            </DrawerTitle>
            <DrawerDescription>{product.description}</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-1 px-4 pb-4">
            <div className="py-1">
              <Label htmlFor="note">Catatan</Label>
              <span className="block text-[10px] py-0">(Opsional)</span>
            </div>
            <div className="flex items-center focus-within:ring-offset-0 focus-within:ring-1 px-2 rounded-md border-2 border-gray-100 focus-within:ring-amber-600">
              <NotepadText size={21} className="text-gray-400" />
              <Input
                type="text"
                slot="input"
                id="note"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 border-0"
                value={note}
                onChange={(e) => {
                  e.target.value.length <= 150 &&
                    (setNote(e.target.value),
                    setTextLength(e.target.value.length));
                }}
                placeholder="Contoh: Jangan terlalu pedas"
              />
            </div>
            <span className="text-end text-xs">{text_length}/150</span>
          </div>
          <DrawerFooter className="pt-4 border-t-8">
            <div className="grid grid-cols-2 pb-4">
              <Label className="flex items-center text-lg">
                Jumlah pesanan
              </Label>
              <div className="grid grid-cols-3 items-center gap-6">
                <Button
                  disabled={quantity <= 1}
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  variant="outline"
                  className="p-[10px] h-fit rounded-full border-amber-700"
                >
                  <Minus size={18} strokeWidth={4} />
                </Button>
                <Input
                  type="number"
                  className="text-center font-bold text-xl border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={quantity}
                  onChange={(e) =>
                    e.target.valueAsNumber > 0 &&
                    setQuantity(e.target.valueAsNumber)
                  }
                />
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  variant="outline"
                  className="rounded-full px-[10px] border-amber-700"
                >
                  <Plus size={18} strokeWidth={3} />
                </Button>
              </div>
            </div>
            <Button
              onClick={() => {
                addToCart();
                updateCart();
                setOpen(false);
              }}
              variant="default"
              className="border-amber-700 rounded-full py-6 text-md bg-amber-600 hover:bg-gray-500"
            >
              {`Tambah Pesanan ${new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumSignificantDigits: 6,
              }).format(quantity * product.price)}`}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
