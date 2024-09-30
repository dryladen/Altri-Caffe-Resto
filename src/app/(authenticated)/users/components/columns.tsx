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
          ? "bg-primary hover:bg-primary"
          : "bg-blue-500 hover:bg-blue-500";
      return <Badge className={color}> {row.getValue("role")} </Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionColumn row={row} />;
    },
  },
];
