"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/types/dataTypes";
import { ArrowLeft, NotebookTabs, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CartItem from "./CartItem";
import Link from "next/link";
import Image from "next/image";

type Customer = {
  name: string;
  phone: string;
  table: string;
  paymentMethod: string;
};
const Konfirmasi = () => {
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
    setCustomer(dataCustomer ? JSON.parse(dataCustomer) : customer);
  }, []);

  const updateCarts = useCallback(
    (cart: Cart) => {
      if (carts.find((c) => c.id === cart.id)) {
        localStorage.setItem(
          "carts",
          JSON.stringify(carts.map((c) => (c.id === cart.id ? cart : c)))
        );
        setCarts(carts.map((c) => (c.id === cart.id ? cart : c)));
      } else {
        localStorage.setItem("carts", JSON.stringify([...carts, cart]));
        setCarts([...carts, cart]);
      }
    },
    [carts, customer]
  );

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  function createOrder() {
    localStorage.setItem("customer", JSON.stringify(customer));
    router.push("/receipt");
  }

  if (carts.length === 0 || customer.name === "-") {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-bold">Data Belum Lengkap</h1>
        <Link href="/">
          <Button className="mt-4 bg-primary hover:bg-primary">
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
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <div className="flex items-center gap-4 w-full p-4 bg-white shadow-sm">
          <Button
            variant={"outline"}
            className="px-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="font-bold text-xl">Konfirmasi</h1>
        </div>
        <div className="flex flex-col p-4 mx-4 border-[1px] shadow-sm rounded-md bg-white">
          <h2 className="text-lg font-semibold">Data Pelanggan</h2>
          <Separator className="my-3" />
          <div className="flex flex-col gap-3 ">
            <div className="flex justify-between flex-wrap text-wrap w-full text-gray-400 text-sm">
              <div className="flex gap-2 flex-wrap">
                <User size={16} />
                <span>Nama Lengkap</span>
              </div>
              <span className="flex text-wrap font-semibold text-gray-700 flex-wrap flex-col">
                {customer.name}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
              <div className="flex gap-2">
                <Phone size={16} />
                <span>No Telepon</span>
              </div>
              <span className="text-gray-700 font-semibold">
                +62{customer.phone}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-sm">
              <div className="flex gap-2">
                <NotebookTabs size={16} />
                <span>No Meja</span>
              </div>
              <span className="font-semibold text-gray-700">
                {customer.table}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 mx-4 grow border-[1px] shadow-sm rounded-md bg-white">
          <h2 className="text-lg font-semibold ">Rincian Pesanan</h2>
          <Separator className="mb-4 mt-2" />
          <div className="flex flex-col gap-4">
            {carts.map((item) => (
              <CartItem
                key={item.id}
                cart={item}
                carts={carts}
                getOrder={getOrder}
                updateCarts={updateCarts}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col p-4 mx-4 grow border-[1px] shadow-sm rounded-md bg-white">
          <h2 className="text-lg font-semibold ">Metode Pembayaran</h2>
          <Separator className="mb-4 mt-2" />
          <RadioGroup defaultValue={customer.paymentMethod}>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="tunai" className="flex gap-2 items-center">
                <Image
                  src={"/tunai.webp"}
                  width={72}
                  height={72}
                  alt="tunai"
                  className="w-auto"
                />
                <span>Tunai</span>
              </Label>
              <RadioGroupItem
                className="text-primary h-4 border-primary"
                value="tunai"
                id="tunai"
                onClick={() =>
                  setCustomer({ ...customer, paymentMethod: "tunai" })
                }
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="qris" className="flex gap-2 items-center">
                <Image
                  src={"/qris.webp"}
                  width={72}
                  height={72}
                  className="w-auto"
                  alt="qris"
                />
                <span>Scan QRIS</span>
              </Label>
              <RadioGroupItem
                className="text-primary h-4 border-primary"
                value="qris"
                id="qris"
                onClick={() =>
                  setCustomer({ ...customer, paymentMethod: "qris" })
                }
              />
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col justify-start p-4 gap-4 sticky w-full bottom-0 bg-white">
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
            className="flex rounded-full py-[10px] shadow-md h-fit bg-primary z- hover:bg-gray-400"
            variant={"default"}
            onClick={() => createOrder()}
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
