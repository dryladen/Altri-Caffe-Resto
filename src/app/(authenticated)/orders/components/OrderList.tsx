"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, LoaderCircle, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/queries";
import OrderItem from "./OrderItem";
import { useRouter } from "next/navigation";
import { Accordion } from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

export default function OrderList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const { data, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const order = await getOrders();
      return order;
    },
  });

  const filtered = useMemo(() => {
    if (status && data) {
      return Array.isArray(data)
        ? data.filter(
            (order) =>
              order.statusOrder === status &&
              order.username.toLowerCase().includes(search.toLowerCase())
          )
        : data;
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
            <Button
              size="sm"
              onClick={() => {
                setLoading(true);
                router.push("/menu");
              }}
              className="gap-1"
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="h-3.5 w-3.5 animate-spin"></LoaderCircle>
              ) : (
                <PlusCircle className="h-3.5 w-3.5" />
              )}
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Buat Pesanan
              </span>
            </Button>
          </div>
        </div>
        <div className="flex items-center w-full mt-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger onClick={() => setStatus("pending")} value="pending">
              <span>Konfirmasi</span>
              <span className="hidden sm:flex rounded-sm py-0 px-1.5 ml-2 bg-primary text-white text-[10px]">
                {Array.isArray(data) && data.filter((order) => order.statusOrder === "pending").length}
              </span>
            </TabsTrigger>
            <TabsTrigger onClick={() => setStatus("proses")} value="proses">
              <span>Sedang Proses</span>
              <span className="hidden sm:flex rounded-sm py-0 px-1.5 ml-2 bg-primary text-white text-[10px]">
                {Array.isArray(data) && data.filter((order) => order.statusOrder === "proses").length}
              </span>
            </TabsTrigger>
            <TabsTrigger onClick={() => setStatus("done")} value="done">
              <span>Selesai</span>
              <span className="hidden sm:flex rounded-sm py-0 px-1.5 ml-2 bg-primary text-white text-[10px]">
                {Array.isArray(data) && data.filter((order) => order.statusOrder === "done").length}
              </span>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pending" className="">
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-4 mt-4"
          >
            {Array.isArray(filtered) && filtered.map((order) => (
              <AccordionItem value={order.id} key={order.id}>
                <OrderItem data={order} />
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="proses" className="flex flex-col gap-4 mt-0">
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-4 mt-4"
          >
            {Array.isArray(filtered) && filtered.map((order) => (
              <AccordionItem value={order.id} key={order.id}>
                <OrderItem data={order} />
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="done" className="flex flex-col gap-4 mt-0">
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-4 mt-4"
          >
            {Array.isArray(filtered) && filtered.map((order) => (
              <AccordionItem value={order.id} key={order.id}>
                <OrderItem data={order} />
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    );
}
