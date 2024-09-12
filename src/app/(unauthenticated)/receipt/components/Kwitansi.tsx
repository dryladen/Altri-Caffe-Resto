"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/types/dataTypes";
import {
  ArrowLeft,
  HandCoins,
  Handshake,
  Hourglass,
  Phone,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import Image from "next/image";
import CartItem from "@/app/(unauthenticated)/confirmation/components/CartItem";

type Customer = {
  name: string;
  phone: string;
  table: string;
  paymentMethod: string;
};
const Kwitansi = () => {
  const [customer, setCustomer] = useState<Customer>({
    name: "-",
    phone: "-",
    table: "-",
    paymentMethod: "tunai",
  });
  const router = useRouter();
  const [carts, setCarts] = useState<Cart[]>([]);

  const getOrder = useCallback(() => {
    const cart = localStorage.getItem("carts");
    const dataCustomer = localStorage.getItem("customer");
    setCarts(cart ? JSON.parse(cart) : []);
    setCustomer((prevCustomer) =>
      dataCustomer ? JSON.parse(dataCustomer) : prevCustomer
    );
  }, []);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  function createOrder() {
    router.push("/customer");
  }
  if (carts.length === 0 || customer.name === "-") {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-bold">Data Belum Lengkap</h1>
        <Link href="/">
          <Button className="mt-4 hover:bg-primary">Kembali ke Menu</Button>
        </Link>
      </div>
    );
  } else {
    const total = carts
      .map((product) => product.totalPrice)
      .reduce((acc, curr) => acc + curr);
    return (
      <div className="flex flex-col i gap-4 bg-white min-h-screen">
        <div className="flex items-center gap-4 w-full p-4 bg-white shadow-sm">
          <Button
            variant={"outline"}
            className="px-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="font-bold text-xl">Kwitansi</h1>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <div className="flex p-4 bg-orange-400 rounded-full text-white items-center justify-center">
              <Hourglass size={42} />
            </div>
          </div>
          <h2 className="flex justify-center items-center p-4 text-3xl font-semibold text-gray-700">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 6,
            }).format(15000)}
          </h2>
          <div className="flex p-4 text-xs bg-red-50 mx-4 rounded-md text-red-500">
            Mohon selesaikan pembayaran untuk konfirmasi pesanan anda
          </div>
        </div>
        <div className="flex grow flex-col p-4 rounded-md shadow-sm mx-4 border-2">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between flex-wrap text-wrap w-full text-gray-400 text-xs">
              <div className="flex gap-2 flex-wrap">
                <span>Status</span>
              </div>
              <span className="flex text-wrap font-semibold text-gray-700 flex-wrap flex-col">
                Menunggu Pembayaran
              </span>
            </div>
            <div className="flex justify-between flex-wrap text-wrap w-full text-gray-400 text-xs">
              <div className="flex gap-2 flex-wrap">
                <span>ID Pesanan</span>
              </div>
              <span className="flex text-wrap font-semibold text-gray-700 flex-wrap flex-col">
                a321lk3j1l23j1l3kj
              </span>
            </div>
            <div className="flex justify-between flex-wrap text-wrap w-full text-gray-400 text-xs">
              <div className="flex gap-2 flex-wrap">
                <span>Antrian Pesanan</span>
              </div>
              <span className="flex text-wrap font-semibold text-gray-700 flex-wrap flex-col">
                12
              </span>
            </div>
            <div className="flex justify-between flex-wrap text-wrap w-full text-gray-400 text-xs">
              <div className="flex gap-2 flex-wrap">
                <span>Tanggal</span>
              </div>
              <span className="flex text-wrap font-semibold text-gray-700 flex-wrap flex-col">
                30 Agustus 2024
              </span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between flex-wrap text-wrap w-full text-gray-400 text-xs">
              <div className="flex gap-2 flex-wrap">
                <span>Nama Pelanggan</span>
              </div>
              <span className="flex text-wrap font-semibold text-gray-700 flex-wrap flex-col capitalize">
                {customer.name}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-xs">
              <div className="flex gap-2">
                <span>No Telepon</span>
              </div>
              <span className="font-semibold text-gray-700">
                {customer.phone}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-xs">
              <div className="flex gap-2">
                <span>Nomor Meja</span>
              </div>
              <span className="font-semibold text-gray-700">
                {customer.table}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-xs">
              <div className="flex gap-2">
                <span>Metode Pembayaran</span>
              </div>
              <span className="capitalize font-semibold text-gray-700">
                {customer.paymentMethod}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 mx-4 grow border-2 shadow-sm rounded-md bg-white">
          <h2 className="text-lg font-semibold ">Rincian Pesanan</h2>
          <Separator className="mb-4 mt-2" />
          <div className="flex flex-col gap-4">
            {carts.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <span className="text-xs font-medium p-1 items-start rounded-md border-[1px]">
                  {item.quantity}x
                </span>
                <div className="flex flex-col w-full">
                  <h4 className="text-sm font-semibold text-gray-600">
                    {item.name}
                  </h4>
                  {item.note && (
                    <span className="py-1 px-2 my-1 bg-gray-100 text-sm text-gray-500 rounded-md">
                      Catatan : {item.note}
                    </span>
                  )}
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
                  <Separator className="my-2" />
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-gray-400 text-sm">
            <div className="flex gap-2">
              <span className="font-semibold">Total</span>
            </div>
            <span className="font-semibold text-lg text-gray-700">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumSignificantDigits: 6,
              }).format(total)}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start p-4 gap-4 sticky w-full bottom-0 bg-white">
          <Button
            className="flex rounded-full py-[10px] shadow-md h-fit"
            variant={"default"}
            onClick={() => createOrder()}
          >
            <span className="font-semibold text-white text-lg">
              Hubungi Kasir
            </span>
          </Button>
        </div>
      </div>
    );
  }
};

export default Kwitansi;
