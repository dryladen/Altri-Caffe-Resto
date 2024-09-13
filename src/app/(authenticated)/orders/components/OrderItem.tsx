"use client";
import DeleteDialog from "@/components/form-controller/DeleteDialog";
import { Button } from "@/components/ui/button";
import { SelectOrderModel } from "@/db/schema/orders";
import { Calendar, Check, Phone, User, X } from "lucide-react";
import { useState } from "react";
import { deleteOrder, updateOrderStatus } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  data: SelectOrderModel;
};
const OrderItem = ({ data }: Props) => {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  const updateStatus = async (status: "pending" | "proses" | "done") => {
    const newStatus = status === "pending" ? "proses" : "done";
    const response = await updateOrderStatus(data.id, newStatus);
    toast({
      title: response.message,
      variant: response.success === true ? "default" : "destructive",
    });
  }    
  return (
    <div
      key={data.username}
      className="flex flex-col rounded-md bg-white shadow-md"
    >
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
      <div className="flex gap-2 rounded-t-md px-4 py-2 text-sm text-gray-800 bg-gray-200 items-center justify-end">
        <Calendar className="h-4 w-4 text-primary" />
        {new Date(data.createdAt).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          <User size={16} className="text-primary" />
          <h2 className="text-gray-800 text-lg font-bold">{data.username}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-primary" />
          <span className="text-sm text-gray-500">+{data.phone}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary text-2xl font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 6,
            }).format(data.totalPayment)}
          </span>
          <div className="flex gap-6">
            {data.status === "pending" && (
              <Button
                size="sm"
                className="bg-red-500 p-2 text-white hover:bg-white hover:text-red-500 border-[1px] hover:border-red-500"
                onClick={() => setDeleteOpen(true)}
              >
                <X size={18} strokeWidth={4} />
              </Button>
            )}
            {data.status !== "done" && (
              <Button
                size="sm"
                className="bg-green-500 p-2 text-white hover:bg-white hover:text-green-500 border-[1px] hover:border-green-500"
                onClick={() => updateStatus(data.status)}
              >
                <Check size={18} strokeWidth={4} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
