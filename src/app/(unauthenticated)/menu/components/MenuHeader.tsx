"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const MenuHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 w-full p-4 bg-white shadow-sm">
      <Button
        variant={"outline"}
        onClick={() => router.back()}
        className="border border-input bg-background hover:bg-primary hover:text-white transition-all p-2 rounded-sm"
      >
        <ArrowLeft size={24} />
      </Button>
      <h1 className="font-bold text-xl">Tambah Pesanan</h1>
    </div>
  );
};

export default MenuHeader;
