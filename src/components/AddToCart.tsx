import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, NotepadText, Plus } from "lucide-react";
import { Cart } from "@/types/dataTypes";
import React, { useCallback, useEffect, useState } from "react";

type AddToCartProps = {
  getCarts: () => void;
  updateCarts: (cart: Cart) => void;
  product: any;
  children: React.ReactNode;
  carts: Cart[];
};

export function AddToCart({
  carts,
  getCarts,
  updateCarts,
  product,
  children,
}: AddToCartProps) {
  const [open, setOpen] = useState(false);
  const [text_length, setTextLength] = useState(0);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);

  const updateInput = useCallback(() => {
    carts.map((c) => {
      if (c.id === product.id) {
        setQuantity(c.quantity);
        setNote(c.note);
      }
    });
  }, [carts, product]);

  useEffect(() => {
    updateInput();
  }, [updateInput]);

  function addToCart() {
    const newCart = {
      ...product,
      note: note,
      quantity: quantity,
      totalPrice: quantity * product.price,
    };
    updateCarts(newCart);
    getCarts();
  }

  return (
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
          <div className="flex items-center focus-within:ring-offset-0 focus-within:ring-1 px-2 rounded-md border-2 border-gray-100 focus-within:ring-primary">
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
            <Label className="flex items-center text-lg">Jumlah pesanan</Label>
            <div className="grid grid-cols-3 items-center gap-6">
              <Button
                disabled={quantity <= 1}
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                variant="outline"
                className="p-[10px] h-fit rounded-full border-primary"
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
                className="rounded-full px-[10px] border-primary"
              >
                <Plus size={18} strokeWidth={3} />
              </Button>
            </div>
          </div>
          <Button
            onClick={() => {
              addToCart();
              setOpen(false);
            }}
            variant="default"
            className="border-primary rounded-full py-6 text-md bg-primary hover:bg-gray-500"
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
  );
}
