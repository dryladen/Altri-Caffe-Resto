"use client";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createProduct, updateProduct } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { productSchema, ProductSchema } from "@/db/schema/products";
import SelectBox from "@/components/form-controller/SelectBox";
import { Input } from "@/components/form-controller/input";
import { Plus } from "lucide-react";

type Props = {
  defaultValues: ProductSchema;
  categoriesData: { id: number; name: string }[] | null;
};

const ProductForm = ({ defaultValues, categoriesData }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
    let response;
    if (data.mode === "create") {
      response = await createProduct(data);
    } else {
      response = await updateProduct(data);
    }
    toast({
      title: response.message,
      variant: response.success === true ? "default" : "destructive",
    });
    setIsOpen(false);
    router.push("/products");
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Tambah Produk"
        description="Silahkan masukan produk yang ingin ditambahkan."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              control={form.control}
              name="name"
              label="Nama"
              placeholder="Contoh: Nasi Goreng"
            />
            <Input
              control={form.control}
              name="description"
              label="Deskripsi"
              placeholder="Contoh: Belum termasuk nasi"
            />
            <Input
              control={form.control}
              name="price"
              label="Harga"
              placeholder="Contoh: 20000"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <SelectBox
              options={[
                { id: "available", name: "Available" },
                { id: "unavailable", name: "Unavailable" },
              ]}
              control={form.control}
              name="status"
              label="Status"
            />
            <SelectBox
              options={categoriesData}
              control={form.control}
              name="categoryId"
              label="Kategori"
            />
            <Button type="submit" className="w-full">
              Simpan
            </Button>
          </form>
        </Form>
      </ResponsiveDialog>
      <Button className="ml-4" onClick={() => setIsOpen(!isOpen)}>
        <Plus size={16} />
        <span className="hidden sm:flex">Tambah Produk</span>
      </Button>
    </>
  );
};

export default ProductForm;
