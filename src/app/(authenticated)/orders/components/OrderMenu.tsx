"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  File,
  ListCheck,
  ListFilter,
  Phone,
  PlusCircle,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/queries";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderMenu() {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const order = await getOrders();
      return order;
    },
  });

  const filtered = useMemo(() => {
    if (search && data) {
      return data.filter((order) =>
        order.username.toLowerCase().includes(search.toLowerCase())
      );
    }
    return data;
  }, [data, search]);

  if (error) return <div>Error: {error.message}</div>;
  if (filtered && data)
    return (
      <Tabs defaultValue="pending">
        <div className="flex justify-between gap-2">
          <Input
            placeholder={`Cari nama produk...`}
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Buat Pesanan
              </span>
            </Button>
          </div>
        </div>
        <div className="flex items-center w-full mt-4">
          <TabsList className="flex justify-evenly w-full bg-white shadow-sm">
            <TabsTrigger value="pending">
              <span>Konfirmasi</span>
              <span className="hidden sm:flex rounded-sm py-1 px-2  ml-2 bg-primary text-white text-xs">
                4
              </span>
            </TabsTrigger>
            <TabsTrigger value="proses">
              <span>Sedang Proses</span>
              <span className="hidden sm:flex rounded-sm py-1 px-2  ml-2 bg-primary text-white text-xs">
                2
              </span>
            </TabsTrigger>
            <TabsTrigger value="done">
              <span>Selesai</span>
              <span className="hidden sm:flex rounded-sm py-1 px-2  ml-2 bg-primary text-white text-xs">
                7
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pending" className="flex flex-col gap-4">
          {filtered.map((order) => (
            <div
              key={order.username}
              className="flex flex-col rounded-md bg-white shadow-md"
            >
              <div className="flex gap-2 rounded-t-md px-4 py-2 text-sm text-gray-800 bg-secondary items-center justify-end">
                <Calendar className="h-4 w-4 text-primary" />
                {new Date(order.createdAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex flex-col gap-1 p-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-gray-800 text-lg font-bold">
                    {order.username}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-sm text-gray-500">+{order.phone}</span>
                </div>
                <span className="text-primary text-2xl mt-2 font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumSignificantDigits: 6,
                  }).format(order.totalPayment)}
                </span>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="proses" className="flex flex-col gap-4">
          {filtered.map((order) => (
            <div
              key={order.username}
              className="flex flex-col rounded-md bg-white shadow-md"
            >
              <div className="flex gap-2 rounded-t-md px-4 py-2 text-sm text-gray-800 bg-secondary items-center justify-end">
                <Calendar className="h-4 w-4 text-primary" />
                {new Date(order.createdAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex flex-col gap-1 p-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-gray-800 text-lg font-bold">
                    {order.username}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-sm text-gray-500">+{order.phone}</span>
                </div>
                <span className="text-primary text-2xl mt-2 font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumSignificantDigits: 6,
                  }).format(order.totalPayment)}
                </span>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    );
}
