"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./ActionColumn";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types";

export const columns: ColumnDef<UserRole>[] = [
  {
    header: "ID",
    accessorKey: "id",
    meta: { className: "hidden" },
    cell: ({ row }) => {
      return <span>{row.getValue("id")} </span>;
    },
  },
  {
    meta: { className: "hidden sm:table-cell" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Nama"} />
    ),
    accessorKey: "username",
    cell: ({ row }) => {
      return <span>{row.getValue("username")} </span>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Email"} />
    ),
    accessorKey: "email",
    cell: ({ row }) => {
      return <span>{row.getValue("email")} </span>;
    },
  },
  {
    meta: { className: "hidden sm:table-cell" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Role"} />
    ),
    accessorKey: "role",
    cell: ({ row }) => {
      const color =
        row.getValue("role") === "admin"
          ? "bg-green-500 hover:bg-green-500"
          : row.getValue("role") === "cashier"
          ? "bg-gray-500 hover:bg-gray-500"
          : "bg-blue-500 hover:bg-blue-500";
      return <Badge className={color}> {row.getValue("role")} </Badge>;
    },
  },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column= { column } title = { "Status"} />
  //     ),
  //   accessorKey: "statusProduct",
  //     meta: { className: "hidden sm:table-cell" },
  //   cell: ({ row }) => {
  //     const color = row.getValue("statusProduct") === "tersedia" ? "bg-green-500 hover:bg-green-500" : "bg-gray-500 hover:bg-gray-500";
  //     return <Badge className={ color }> { row.getValue("statusProduct") } </Badge>;
  //   },
  //   },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column= { column } title = { "Deskripsi"} />
  //     ),
  //   accessorKey: "description",
  //     meta: { className: "hidden sm:table-cell" },
  //   cell: ({ row }) => {
  //     return <span>{ row.getValue("description") } </span>;
  //   },
  //   },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column= { column } title = { "Harga"} />
  //     ),
  //   accessorKey: "price",
  //     cell: ({ row }) => {
  //       const price = new Intl.NumberFormat("id-ID", {
  //         style: "currency",
  //         currency: "IDR",
  //         maximumSignificantDigits: 6,
  //       }).format(row.getValue("price"));
  //       return price;
  //     },
  //   },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column= { column } title = { "Kategori"} />
  //     ),
  //   accessorKey: "categories.name",
  //     id: "categoryName",
  //       meta: { className: "hidden lg:table-cell" },
  //   cell: ({ row }) => {
  //     return <span>{ row.getValue("categoryName") } </span>;
  //   },
  //   },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column= { column } title = { "Dibuat pada"} />
  //     ),
  //   accessorKey: "created_at",
  //     meta: { className: "hidden lg:table-cell" },
  //   cell: ({ row }) => {
  //     const created_at = new Date(row.getValue("created_at"));
  //     const formattedDate = created_at.toLocaleDateString("id-ID", {
  //       weekday: "long",
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     });
  //     return <span>{ formattedDate } </span>;
  //   },
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionColumn row={row} />;
    },
  },
];
