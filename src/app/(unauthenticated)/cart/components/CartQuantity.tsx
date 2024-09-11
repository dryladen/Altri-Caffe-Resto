import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cart } from "@/types/dataTypes";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteDialog from "@/components/form-controller/DeleteDialog";

type CartProps = {
  carts: Cart[];
  getCart: () => void;
  updateCarts: (cart: Cart) => void;
  data: Cart;
};
const CartQuantity = ({ carts, getCart, updateCarts, data }: CartProps) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [totalPrice, setTotalPrice] = useState(data.price * quantity);

  function deleteItem() {
    const newCarts = carts.filter((c) => c.id !== data.id);
    localStorage.setItem("carts", JSON.stringify(newCarts));
    getCart();
  }

  useEffect(() => {
    setQuantity(data.quantity);
    setTotalPrice(data.totalPrice);
  }, [data]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <div className="col-span-2 flex flex-col justify-between w-full">
      <DeleteDialog deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} actionFn={()=> deleteItem()} />
      <div className="flex flex-col">
        <span className="text-sm font-bold text-wrap">{data.name}</span>
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
                setTotalPrice(data.price * (quantity - 1));
                updateCarts({
                  ...data,
                  quantity: quantity - 1,
                  totalPrice: data.price * (quantity - 1),
                });
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
                setTotalPrice(data.price * e.target.valueAsNumber);
                updateCarts({
                  ...data,
                  quantity: e.target.valueAsNumber,
                  totalPrice: data.price * e.target.valueAsNumber,
                });
              }
            }}
          />
          <Button
            variant="outline"
            className="rounded-full px-2 h-fit border-amber-700"
            onClick={() => {
              setQuantity(quantity + 1);
              setTotalPrice(data.price * (quantity + 1));
              updateCarts({
                ...data,
                quantity: quantity + 1,
                totalPrice: data.price * (quantity + 1),
              });
            }}
          >
            <Plus size={12} strokeWidth={3} />
          </Button>
        </div>
        <Button variant="ghost" onClick={() => setDeleteOpen(true)} className="p-0 h-fit">
          <Trash2 size={21} strokeWidth={2} className="text-red-500 " />
        </Button>
      </div>
    </div>
  );
};

export default CartQuantity;
