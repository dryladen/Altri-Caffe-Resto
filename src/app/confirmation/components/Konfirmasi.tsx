"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/types/dataTypes";
import { ArrowLeft, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";

type Customer = {
  name: string;
  phone: string;
  table: string;
};
const Konfirmasi = () => {
  const [customer, setCustomer] = useState<Customer>({
    name: "-",
    phone: "-",
    table: "-",
  });
  const router = useRouter();
  const [carts, setCarts] = useState<Cart[]>([]);
  useEffect(() => {
    const cart = localStorage.getItem("carts");
    const dataCustomer = localStorage.getItem("customer");
    setCarts(cart ? JSON.parse(cart) : []);
    setCustomer(dataCustomer ? JSON.parse(dataCustomer) : {});
  }, []);
  if (carts.length === 0 || customer.name === "-") {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-bold">Data Belum Lengkap</h1>
        <Link href="/">
          <Button className="mt-4 bg-amber-600 hover:bg-amber-500">
            Kembali ke Menu
          </Button>
        </Link>
      </div>
    );
  } else {
    const total = carts
      .map((product) => product.totalPrice)
      .reduce((acc, curr) => acc + curr);
    return (
      <div className="bg-gray-100">
        <div className="flex items-center gap-4 w-full p-4 bg-white">
          <Link className="" href="/checkout">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-semibold text-lg">Konfirmasi</h1>
        </div>
        <div className="flex flex-col p-4 mx-4 my-4 border-[1px] shadow-sm rounded-md bg-white">
          <h2 className="text-lg font-semibold mb-4">Data Pelanggan</h2>
          <div className="flex justify-between flex-wrap text-wrap w-full text-gray-400 text-sm">
            <div className="flex gap-2 flex-wrap">
              <User size={16} />
              <span>Nama Lengkap</span>
            </div>
            <span className="flex text-wrap flex-wrap flex-col">
              {customer.name}
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-gray-400 text-sm">
            <div className="flex gap-2">
              <Phone size={16} />
              <span>No Telepon</span>
            </div>
            <span>+62{customer.phone}</span>
          </div>
        </div>
        <div className="flex flex-col p-4 mx-4 my-4 border-[1px] shadow-sm rounded-md bg-white">
          <h2 className="text-lg font-semibold ">Rincian Pesanan</h2>
          <Separator className="mb-4 mt-2" />
          <div className="flex flex-col gap-4">
            {carts.map((item) => (
              <CartItem
                key={item.id}
                cart={item}
                carts={carts}
                setCarts={setCarts}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col p-4 gap-4 sticky bottom-0 bg-white">
          <div className="flex font-bold text-gray-700 text-lg justify-between">
            <h3>Total Harga</h3>
            <span>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumSignificantDigits: 6,
              }).format(total)}
            </span>
          </div>
          <Button
            className="flex rounded-full py-[10px] shadow-md h-fit bg-amber-600 z- hover:bg-gray-400"
            variant={"default"}
          >
            <span className="font-semibold text-white text-lg">
              Konfirmasi Pesanan
            </span>
          </Button>
        </div>
      </div>
    );
  }
};

export default Konfirmasi;
