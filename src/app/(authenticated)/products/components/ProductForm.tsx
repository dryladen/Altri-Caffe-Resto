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
import { Input } from "@/components/ui/input";
import { createProduct, updateProduct } from "./action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { productSchema, ProductSchema } from "@/db/schema/products";
import SelectBox from "@/components/SelectBox";

type Props = {
  defaultValues: ProductSchema;
  categoriesData: { id: number; name: string }[] | null;
};

const ProductForm = ({ defaultValues, categoriesData }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh : Nasi Goreng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh : Belum termasuk nasi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh : 20000"
                      inputMode="numeric" // display numeric keyboard on mobile
                      {...field}
                      value={field.value || ""} // avoid errors of uncontrolled vs controlled
                      pattern="[0-9]*" // to receive only numbers without showing does weird arrows in the input
                      onChange={
                        (e) =>
                          e.target.validity.valid &&
                          field.onChange(e.target.value) // e.target.validity.valid is required for pattern to work
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
        Tambah Produk
      </Button>
    </>
  );
};

export default ProductForm;
