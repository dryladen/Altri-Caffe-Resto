"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductSchema } from "@/db/schema/products";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../components/action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/form-controller/input";
import SelectBox from "@/components/form-controller/SelectBox";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import DeleteDialog from "@/components/form-controller/DeleteDialog";

type Props = {
  defaultValues: ProductSchema;
  categoriesData: { id: string; name: string }[] | null;
  productId: string;
  children: React.ReactNode;
};

const FormDetails = ({
  defaultValues,
  categoriesData,
  productId,
  children,
}: Props) => {
  const router = useRouter();
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
    let response;
    if (data.mode === "update") {
      response = await updateProduct(data);
    } else {
      response = await createProduct(data);
    }
    toast({
      title: response.message,
      variant: response.success === true ? "default" : "destructive",
    });
  };
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DeleteDialog
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            actionFn={async () => {
              let response = await deleteProduct(productId);
              toast({
                title: response.message,
                variant: response.success === true ? "default" : "destructive",
              });
              router.push("/products");
            }}
          />
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <Link href="/products">
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="h-7 w-7"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Kembali</span>
                  </Button>
                </Link>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Produk
                </h1>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                >
                  Hapus
                </Button>
                <Button type="submit" size="sm">
                  Simpan
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Detail Produk</CardTitle>
                    <CardDescription>
                      Silahkan ubah detail produk sesuai kebutuhan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input control={form.control} name="name" label="Nama" />
                    <Input
                      control={form.control}
                      name="description"
                      label="Deskripsi"
                    />
                    <Input control={form.control} name="price" label="Harga" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SelectBox
                      options={[
                        { id: "tersedia", name: "Tersedia" },
                        { id: "kosong", name: "Kosong" },
                      ]}
                      control={form.control}
                      name="statusProduct"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Kategori</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SelectBox
                      options={categoriesData}
                      control={form.control}
                      name="category_id"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {children}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 md:hidden">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setDeleteOpen(true)}
              >
                Hapus
              </Button>
              <Button type="submit" size="sm">
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormDetails;
