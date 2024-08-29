"use client";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/types/dataTypes";
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
import { AddToCart } from "@/components/AddToCart";

type CartItemProps = {
  carts: Cart[];
  getOrder: () => void;
  updateCarts: (cart: Cart) => void;
  cart: Cart;
};

const CartItem = ({ cart, carts, getOrder, updateCarts }: CartItemProps) => {
  function deleteItem() {
    const newCarts = carts.filter((c) => c.id !== cart.id);
    localStorage.setItem("carts", JSON.stringify(newCarts));
    getOrder();
  }
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs font-medium p-1 items-start rounded-md border-[1px]">
        {cart.quantity}x
      </span>
      <div className="flex flex-col w-full">
        <h4 className="text-sm font-semibold text-gray-600">{cart.name}</h4>
        {cart.note && (
          <span className="py-1 px-2 my-1 bg-gray-100 text-sm text-gray-500 rounded-md">
            Catatan : {cart.note}
          </span>
        )}
        <div className="flex gap-6 pt-2 text-sm  font-bold">
          <AddToCart
            carts={carts}
            getCarts={getOrder}
            updateCarts={updateCarts}
            product={cart}
          >
            <span className="text-amber-600">Ubah</span>
          </AddToCart>
          <AlertDialog>
            <AlertDialogTrigger className="p-0 h-fit items-end border-0 bg-white hover:bg-white">
              <span className="text-red-500">Hapus</span>
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
        <div className="flex justify-between text-gray-600 pt-4">
          <span className="text-sm font-bold">Harga</span>
          <span className="text-sm font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 6,
            }).format(cart.totalPrice)}
          </span>
        </div>
        <Separator className="my-2" />
      </div>
    </div>
  );
};

export default CartItem;
