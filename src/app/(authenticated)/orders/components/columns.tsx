"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { SelectOrderModel } from "@/db/schema/orders";

export const columns: ColumnDef<SelectOrderModel>[] = [
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
    accessorKey: "username",
    cell: ({ row }) => {
      return <span>{row.getValue("username")}</span>;
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
      <DataTableColumnHeader column={column} title={"Total"} />
    ),
    accessorKey: "totalPayment",
    cell: ({ row }) => {
      const price = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 6,
      }).format(row.getValue("totalPayment"));
      return price;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Metode Pembayaran"} />
    ),
    accessorKey: "paymentMethode",
    meta: { className: "hidden sm:table-cell" },
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("paymentMethode")}</span>;
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
