"use client";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { description } from "../../layout";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  price: z
    .number({ required_error: "Tentukan harga produk" })
    .positive({ message: "Harga tidak boleh kosong" })
    .int({ message: "Masukan angka" })
    .or(z.string())
    .pipe(
      z.coerce
        .number({ required_error: "Tentukan harga produk" })
        .positive({ message: "Harga tidak boleh kosong" })
        .int({ message: "Masukan angka" })
    ),
  status: z.string().min(2,"Minimal 2 kata").max(50),
  categoryId: z.string().min(2).max(50),
});
const AddData = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      status: "",
      categoryId: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Data"
        description="Silahkan masukan data yang ingin ditambahkan."
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh : Ready" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh : 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

export default AddData;
