"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddCustomer = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [table, setTable] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("tunai");

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    if (customer) {
      const { name, phone, table, paymentMethod } = JSON.parse(customer);
      setName(name);
      setPhone(phone);
      setTable(table);
      setPaymentMethod(paymentMethod ? paymentMethod : "tunai");
    }
  }, []);

  function handleCheckout() {
    localStorage.setItem(
      "customer",
      JSON.stringify({ name, phone, table, paymentMethod })
    );
    router.push("/confirmation");
  }
  return (
    <>
      <div className="flex items-center gap-4 w-full p-4 bg-white shadow-sm">
        <Button
          variant={"outline"}
          className="px-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="font-bold text-xl">Checkout</h1>
      </div>
      <div className="flex flex-col mt-4 p-4 md:mx-14 grow">
        <h2 className="text-xl font-semibold">Informasi Pembelian</h2>
        <Separator className="mt-2" />
        <div className="flex flex-col py-8">
          <Label htmlFor="name" className="font-medium">
            Nama Lengkap
          </Label>
          <Input
            name="name"
            type="text"
            placeholder="Masukan nama lengkap"
            className="mt-3 text-md focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="phone" className="font-medium mt-4">
            Nomor Telepon
          </Label>
          <div className="flex mt-3 focus-within:ring-1 focus-within:ring-primary rounded-md">
            <div className="bg-gray-200 flex text-center rounded-l-md">
              <span className="text-md flex text-center py-2 px-3 ">+62</span>
            </div>
            <Input
              name="phone"
              type="number"
              placeholder="8xxxxxxxxxx"
              className="rounded-l-none text-md focus-visible:ring-0 focus-visible:ring-offset-0"
              value={phone == 0 ? "" : phone}
              onChange={(e) => setPhone(e.target.valueAsNumber)}
            />
          </div>
          <span className="text-sm text-gray-400 mt-4">
            Nomor Telepon akan digunakan untuk pengiriman status pesanan melalui
            WhatsApp.
          </span>
          <Label htmlFor="table" className="font-medium mt-3">
            Nomor Meja
          </Label>
          <Input
            name="table"
            type="number"
            placeholder="Masukan nomor meja"
            className="mt-3 text-md focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
            value={table == 0 ? "" : table}
            onChange={(e) => setTable(e.target.valueAsNumber)}
          />
        </div>
      </div>
      <Separator className="h-4 bg-gray-100" />
      <Button
        className="flex rounded-full mx-4 md:mt-20 md:mx-14 sticky py-[10px] right-4 left-4 bottom-4 shadow-md h-fit bg-primary z- hover:bg-gray-400"
        variant={"default"}
        onClick={handleCheckout}
        disabled={!name || !phone || !table}
      >
        <span className="font-semibold text-white text-lg">
          Lanjutkan Pembayaran
        </span>
      </Button>
    </>
  );
};

export default AddCustomer;
