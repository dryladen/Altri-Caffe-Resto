"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable/data-table-column-header";
import { SelectProductModel } from "@/db/schema/products";
import { ActionColumn } from "./ActionColumn";
import { Badge } from "@/components/ui/badge";
import { SelectCategoryModel } from "@/db/schema/categories";

export const columnsProduct: ColumnDef<SelectProductModel>[] = [
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
    accessorKey: "statusProduct",
    meta: { className: "hidden sm:table-cell" },
    cell: ({ row }) => {
      const color = row.getValue("statusProduct") === "tersedia" ? "bg-green-500 hover:bg-green-500" : "bg-gray-500 hover:bg-gray-500";
      return <Badge className={color}>{row.getValue("statusProduct")}</Badge>;
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
    accessorKey: "categories.name",
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
    accessorKey: "created_at",
    meta: { className: "hidden xl:table-cell" },
    cell: ({ row }) => {
      const created_at = new Date(row.getValue("created_at"));
      const formattedDate = created_at.toLocaleDateString("id-ID", {
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

export const columnsCategory: ColumnDef<SelectCategoryModel>[] = [
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
      <DataTableColumnHeader column={column} title={"Dibuat pada"} />
    ),
    accessorKey: "created_at",
    meta: { className: "hidden lg:table-cell" },
    cell: ({ row }) => {
      const created_at = new Date(row.getValue("created_at"));
      const formattedDate = created_at.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return <ActionColumn row={row} />;
  //   },
  // },
];
