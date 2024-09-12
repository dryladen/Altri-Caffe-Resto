"use client";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { createProduct, updateProduct } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { productSchema, ProductSchema } from "@/db/schema/products";
import SelectBox from "@/components/form-controller/SelectBox";
import { Input } from "@/components/form-controller/input";
import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/queries";

type Props = {
  defaultValues: ProductSchema;
};

const ProductForm = ({ defaultValues }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const { data: categories } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getCategories();
      return products;
    },
  });

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
  if(!categories) return  <div>Loading...</div>;
  if(categories)
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
                { id: "tersedia", name: "Tersedia" },
                { id: "kosong", name: "Kosong" },
              ]}
              control={form.control}
              name="status"
              label="Status"
            />
            <SelectBox
              options={categories}
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
        <PlusCircle className="sm:mr-2" size={16} />
        <span className="hidden sm:flex">Tambah Produk</span>
      </Button>
    </>
  );
};

export default ProductForm;
