import React from "react";
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
import { File, ListFilter, PlusCircle } from "lucide-react";
import { db } from "@/db";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./components/columns";

const page = async () => {
  const getOrders = await db.query.ordersTable.findMany();
  return (
    <Tabs defaultValue="pending">
      <div className="flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Buat Pesanan
          </span>
        </Button>
      </div>
      <div className="flex items-center w-full mt-4">
        <TabsList className="flex justify-evenly w-full bg-white">
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
      <TabsContent value="pending">
        <DataTable data={getOrders} columns={columns} />
      </TabsContent>
    </Tabs>
  );
};

export default page;
