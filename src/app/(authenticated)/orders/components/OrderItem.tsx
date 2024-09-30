"use client";
import DeleteDialog from "@/components/form-controller/DeleteDialog";
import { Button } from "@/components/ui/button";
import { SelectOrderModel } from "@/db/schema/orders";
import {
  Calendar,
  Check,
  ConciergeBell,
  CreditCard,
  Info,
  Phone,
  ReceiptText,
  Sofa,
  User,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { deleteOrder, updateOrderStatus } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import UserContext from "@/lib/UserContext";

type Props = {
  data: SelectOrderModel;
};
const OrderItem = ({ data }: Props) => {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { user } = useContext(UserContext);
  const updateStatus = async (status: "pending" | "proses" | "done") => {
    const newStatus = status === "pending" ? "proses" : "done";
    const response = await updateOrderStatus(data.id, newStatus);
    toast({
      title: response.message,
      variant: response.success === true ? "default" : "destructive",
    });
  };
  return (
    <div className="flex flex-col rounded-md bg-white shadow-md">
      <DeleteDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        actionFn={async () => {
          const response = await deleteOrder(data.id);
          toast({
            title: response.message,
            variant: response.success === true ? "default" : "destructive",
          });
          router.push("/orders");
        }}
      />
      <div className="flex gap-2 rounded-t-md px-4 py-2 text-sm text-gray-800 bg-gray-200 items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          {new Date(data.created_at).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary" />
              <h2 className="text-gray-700 text-lg font-bold">
                {data.username}
              </h2>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span className="text-sm text-gray-500">+62{data.phone}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-primary" />
                <span className="text-sm text-gray-500 capitalize">
                  {data.payment_methode}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-xs text-white bg-primary text-center rounded-t-md px-2">
              Meja
            </span>
            <span className="text-center text-xl text-primary w-full border-primary border-2 rounded-b-md font-bold">
              {data.table_number}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary text-2xl font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 6,
            }).format(data.total_payment)}
          </span>
          <div className="flex gap-4">
            {(data.statusOrder === "pending" || user.user_role === "admin") && (
              <Button
                size="sm"
                className="bg-red-500 p-2 text-white hover:bg-white hover:text-red-500 border-[1px] hover:border-red-500"
                onClick={() => setDeleteOpen(true)}
              >
                <X size={18} strokeWidth={4} />
              </Button>
            )}
            {data.statusOrder !== "done" && (
              <Button
                size="sm"
                className="bg-green-500 p-2 text-white hover:bg-white hover:text-green-500 border-[1px] hover:border-green-500"
                onClick={() => updateStatus(data.statusOrder)}
              >
                <Check size={18} strokeWidth={4} />
              </Button>
            )}
          </div>
        </div>
      </div>
      <AccordionTrigger className="px-4 pt-0 pb-4">
        <div className="flex items-center gap-2">
          <ConciergeBell className="h-4 w-4 text-primary" />
          <h2 className="text-gray-700 text-lg font-bold">List Pesanan</h2>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2 p-4">
          {data.carts.map((cart) => (
            <div
              key={cart.id}
              className="flex gap-4 justify-between items-center border-b border-gray-200 py-2"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ReceiptText size={16} className="text-primary" />
                  <h4 className="text-sm text-gray-700 font-semibold">
                    {cart.product.name}
                  </h4>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">
                  {cart.quantity} x{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumSignificantDigits: 6,
                  }).format(cart.product.price)}
                </span>
                <span className="text-sm text-primary border-t-2 border-gray-500">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumSignificantDigits: 6,
                  }).format(cart.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </div>
  );
};

export default OrderItem;
