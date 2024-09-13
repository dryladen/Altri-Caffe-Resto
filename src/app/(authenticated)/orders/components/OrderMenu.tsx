"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/queries";
import OrderItem from "./OrderItem";
import { useRouter } from "next/navigation";

export default function OrderMenu() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending");
  
  const { data, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const order = await getOrders();
      return order;
    },
  });

  const filtered = useMemo(() => {
    if (status && data) {
      return data.filter(
        (order) =>
          order.status === status &&
          order.username.toLowerCase().includes(search.toLowerCase())
      );
    }
    return data;
  }, [data, status, search]);

  if (error) return <div>Error: {error.message}</div>;
  if (filtered && data)
    return (
      <Tabs defaultValue="pending">
        <div className="flex justify-between gap-2">
          <Input
            placeholder={`Cari nama pelanggan...`}
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
            <Button size="sm" onClick={()=> router.push("/menu")} className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Buat Pesanan
              </span>
            </Button>
          </div>
        </div>
        <div className="flex items-center w-full mt-6">
          <TabsList className="flex justify-evenly w-full bg-white shadow-md">
            <TabsTrigger onClick={() => setStatus("pending")} value="pending">
              <span>Konfirmasi</span>
              <span className="hidden sm:flex rounded-sm py-0 px-1.5 ml-2 bg-primary text-white text-[10px]">
                {data.filter((order) => order.status === "pending").length}
              </span>
            </TabsTrigger>
            <TabsTrigger onClick={() => setStatus("proses")} value="proses">
              <span>Sedang Proses</span>
              <span className="hidden sm:flex rounded-sm py-0 px-1.5 ml-2 bg-primary text-white text-[10px]">
                {data.filter((order) => order.status === "proses").length}
              </span>
            </TabsTrigger>
            <TabsTrigger onClick={() => setStatus("done")} value="done">
              <span>Selesai</span>
              <span className="hidden sm:flex rounded-sm py-0 px-1.5 ml-2 bg-primary text-white text-[10px]">
                {data.filter((order) => order.status === "done").length}
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pending" className="flex flex-col gap-4 mt-4">
          {filtered.map((order) => (
            <OrderItem key={order.id} data={order} />
          ))}
        </TabsContent>
        <TabsContent value="proses" className="flex flex-col gap-4 mt-0">
          {filtered.map((order) => (
            <OrderItem key={order.id} data={order} />
          ))}
        </TabsContent>
        <TabsContent value="done" className="flex flex-col gap-4 mt-0">
          {filtered.map((order) => (
            <OrderItem key={order.id} data={order} />
          ))}
        </TabsContent>
      </Tabs>
    );
}
