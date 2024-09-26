"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./ActionColumn";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { User } from "@supabase/supabase-js";

export const columns: ColumnDef<User>[] = [
  {
    header: "ID",
    accessorKey: "id",
    meta: { className: "hidden" },
    cell: ({ row }) => {
      return <span>{ row.getValue("id") } </span>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column= { column } title={ "Email"} />
    ),
accessorKey: "email",
  cell: ({ row }) => {
    return <span>{ row.getValue("email") } </span>;
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
      return <ActionColumn row={ row } />;
    },
  },
];
