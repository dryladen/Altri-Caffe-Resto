"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/types/dataTypes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  const [carts, setCarts] = useState<Cart[]>([]);
  useEffect(() => {
    const cart = localStorage.getItem("carts");
    const dataCustomer = localStorage.getItem("customer");
    setCarts(cart ? JSON.parse(cart) : []);
    setCustomer(dataCustomer ? JSON.parse(dataCustomer) : {});
  }, []);
  return (
    <div className="bg-gray-100">
      <div className="flex items-center gap-4 w-full p-4 bg-white">
        <Link className="" href="/checkout">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-semibold text-lg">Konfirmasi</h1>
      </div>
      <Separator className="h-4 bg-gray-200" />
      <div className="flex flex-col p-4 mx-4 my-4 border-[1px] shadow-sm rounded-md bg-white">
        <h2 className="text-lg font-semibold mb-4">Data Pelanggan</h2>
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Nama Lengkap</span>
          <span>{customer.name}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Nomor Telepon</span>
          <span>+62{customer.phone}</span>
        </div>
      </div>
      <div className="flex flex-col p-4 mx-4 my-4 border-[1px] shadow-sm rounded-md bg-white">
        <h2 className="text-lg font-semibold ">Rincian Pesanan</h2>
        <Separator className="mb-4 mt-2" />
        <div className="flex flex-col gap-4">
          {carts.map((item) => (
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium p-1 items-start rounded-md border-[1px]">
                {item.quantity}x
              </span>
              <div className="flex flex-col w-full">
                <h4 className="text-sm font-semibold text-gray-600">
                  {item.name}
                </h4>
                <div className="flex gap-6 pt-2 text-sm  font-bold">
                  <span className="text-amber-600">Ubah</span>
                  <span className="text-red-500">Hapus</span>
                </div>
                <div className="flex justify-between text-gray-600 pt-4">
                  <span className="text-sm font-bold">Harga</span>
                  <span className="text-sm font-bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumSignificantDigits: 6,
                    }).format(item.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Konfirmasi;
