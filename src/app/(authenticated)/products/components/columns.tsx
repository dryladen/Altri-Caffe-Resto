"use client";
import { SelectProduct } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";

export const columns: ColumnDef<SelectProduct>[] = [
  {
    header: "ID",
    accessorKey: "id",
    meta: { className: "hidden sm:table-cell" },
    cell: ({ row }) => {
      return <span>{row.getValue("id")}</span>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Nama"} />
    ),
    accessorKey: "name",
    cell: ({ row }) => {
      return <span>{row.getValue("name")}</span>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Status"} />
    ),
    accessorKey: "status",
    meta: { className: "hidden sm:table-cell" },
    cell: ({ row }) => {
      return <span>{row.getValue("status")}</span>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Deskripsi"} />
    ),
    accessorKey: "description",
    meta: { className: "hidden sm:table-cell" },
    cell: ({ row }) => {
      return <span>{row.getValue("description")}</span>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Harga"} />
    ),
    accessorKey: "price",
    cell: ({ row }) => {
      const price = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 6,
      }).format(row.getValue("price"));
      return price;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Kategori"} />
    ),
    accessorKey: "categoryId",
    meta: { className: "hidden lg:table-cell" },
    cell: ({ row }) => {
      return <span>{row.getValue("categoryId")}</span>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Dibuat pada"} />
    ),
    accessorKey: "createdAt",
    meta: { className: "hidden lg:table-cell" },
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const formattedDate = createdAt.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
