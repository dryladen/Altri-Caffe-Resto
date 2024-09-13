"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { SelectProductModel } from "@/db/schema/products";
import { ActionColumn } from "./ActionColumn";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<SelectProductModel>[] = [
  {
    header: "ID",
    accessorKey: "id",
    meta: { className: "hidden" },
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
      const color = row.getValue("status") === "tersedia" ? "green" : "gray";
      return <Badge className={`bg-${color}-500 hover:bg-${color}-500`}>{row.getValue("status")}</Badge>;
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
    accessorKey: "category.name",
    id: "categoryName",
    meta: { className: "hidden lg:table-cell" },
    cell: ({ row }) => {
      return <span>{row.getValue("categoryName")}</span>;
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
      return <ActionColumn row={row} />;
    },
  },
];
