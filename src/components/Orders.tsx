import { Cart } from "@/types/dataTypes";
import { Dot, ShoppingCart } from "lucide-react";
import Link from "next/link";

type OrdersProps = {
  carts: Cart[];
};

const Orders = ({ carts }: OrdersProps) => {
  if (carts.length === 0) {
    return null;
  } else {
    const total = carts
      .map((product) => product.totalPrice)
      .reduce((acc, curr) => acc + curr);
    return (
      <div className="md:hidden flex rounded-full mt-4 sticky bottom-4 shadow-md bg-white z-50">
        <div className="flex text-amber-600 gap-2 items-center px-4 py-3 w-full">
          <ShoppingCart size={18} strokeWidth={3} />
          <Link href="/cart">
            <div className="flex items-center">
              <span className="font-semibold p-0 text-sm">{carts.length} Item</span>
              <Dot size={12} strokeWidth={5} />
              <span className="font-semibold text-md p-0">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumSignificantDigits: 6,
                }).format(total)}
              </span>
            </div>
          </Link>
        </div>
        <Link
          className="flex items-center py-2 px-4 rounded-r-full bg-amber-600 text-white"
          href="/checkout"
        >
          <span>Checkout</span>
        </Link>
      </div>
    );
  }
};

export default Orders;
