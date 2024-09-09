"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { SelectOrderModel } from "@/db/schema/orders";

export const columns: ColumnDef<SelectOrderModel>[] = [
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
];
