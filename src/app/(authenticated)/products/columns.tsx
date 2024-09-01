"use client";

import { SelectProduct } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<SelectProduct>[] = [
  {
    header: () => <div className="hidden sm:flex">ID</div>,
    accessorKey: "id",
    cell: ({ row }) => {
      return <span className="hidden sm:flex">{row.getValue("id")}</span>;
    },
    
  },
  {
    header: "Nama",
    accessorKey: "name",
  },
  {
    header: () => <div className="hidden sm:flex">Status</div>,
    accessorKey: "status",
    cell: ({ row }) => {
      return <span className="hidden sm:flex">{row.getValue("status")}</span>;
    },
  },
  {
    header: () => <div className="hidden sm:flex">Deskripsi</div>,
    accessorKey: "description",
    cell: ({ row }) => {
      return (
        <span className="hidden sm:flex">{row.getValue("description")}</span>
      );
    },
  },
  {
    header: "Harga",
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
    header: () => <div className="hidden sm:flex">Kategori</div>,
    accessorKey: "categoryId",
    cell: ({ row }) => {
      return <span className="hidden sm:flex">{row.getValue("categoryId")}</span>;
    },
  },
  {
    header: () => <div className="hidden sm:flex">Dibuat Pada</div>,
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const formattedDate = createdAt.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <span className="hidden sm:flex">{formattedDate}</span>;
    },
  },
];
