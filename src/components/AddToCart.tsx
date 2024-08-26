import * as React from "react";

import { cn } from "@/lib/utils";
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
import { Minus, Plus, ShoppingCart } from "lucide-react";

export function AddToCart({ product }: { product: any }) {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant={"outline"}
            className="w-full flex gap-2 py-1 h-fit text-amber-700 border-amber-700 rounded-lg"
          >
            <ShoppingCart size={16} />
            <span className="font-bold p-0">Tambah</span>
          </Button>
        </DrawerTrigger>
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
          <ProfileForm className="px-4" />
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
                  className="font-bold text-xl border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                  value={quantity}
                  onChange={(e) => e.target.valueAsNumber > 0 && setQuantity(e.target.valueAsNumber)}
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
            <Button variant="outline" className="border-amber-700 rounded-full">
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

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4 mb-4", className)}>
      <div className="grid gap-1">
        <div>
          <Label htmlFor="note">Catatan</Label>
          <span className="block text-[10px] py-0">(Opsional)</span>
        </div>
        <Input
          type="text"
          id="note"
          placeholder="Contoh: Jangan terlalu pedas"
        />
      </div>
    </form>
  );
}
