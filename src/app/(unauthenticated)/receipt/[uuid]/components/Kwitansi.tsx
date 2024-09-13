"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOrdersById } from "@/lib/queries";

type Props = {
  uuid: string;
};
const Kwitansi = ({ uuid }: Props) => {
  const router = useRouter();

  const {
    data: orders,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const orders = await getOrdersById(uuid);
      return orders;
    },
  });
  if (isLoading && !orders) return <div>Loading...</div>;
  if (orders && orders.carts)
    return (
      <div className="flex flex-col i gap-4 bg-white min-h-screen">
        <div className="flex items-center gap-4 w-full p-4 bg-white shadow-sm">
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
                {orders.username}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-xs">
              <div className="flex gap-2">
                <span>No Telepon</span>
              </div>
              <span className="font-semibold text-gray-700">
                {orders.phone}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-xs">
              <div className="flex gap-2">
                <span>Nomor Meja</span>
              </div>
              <span className="font-semibold text-gray-700">
                {orders.tableNumber}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-xs">
              <div className="flex gap-2">
                <span>Metode Pembayaran</span>
              </div>
              <span className="capitalize font-semibold text-gray-700">
                {orders.paymentMethode}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 mx-4 grow border-2 shadow-sm rounded-md bg-white">
          <h2 className="text-lg font-semibold ">Rincian Pesanan</h2>
          <Separator className="mb-4 mt-2" />
          <div className="flex flex-col gap-4">
            {orders.carts.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <span className="text-xs font-medium p-1 items-start rounded-md border-[1px]">
                  {item.quantity}x
                </span>
                <div className="flex flex-col w-full">
                  <h4 className="text-sm font-semibold text-gray-600">
                    {item.product.name}
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
                      }).format(item.total)}
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
              }).format(orders.totalPayment)}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start p-4 gap-4 sticky w-full bottom-0 bg-white">
          <Button
            className="flex rounded-full py-[10px] shadow-md h-fit"
            variant={"default"}
            onClick={() => router.push("/customer")}
          >
            <span className="font-semibold text-white text-lg">
              Kembali ke Menu
            </span>
          </Button>
        </div>
      </div>
    );
};

export default Kwitansi;
