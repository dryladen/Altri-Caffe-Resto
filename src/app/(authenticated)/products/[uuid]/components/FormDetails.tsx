"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Delete, Trash2, Upload } from "lucide-react";
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
  gambar: any[] | null;
};

const FormDetails = ({
  defaultValues,
  categoriesData,
  productId,
  gambar,
}: Props) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
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
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  variant="outline"
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
                <Card x-chunk="dashboard-07-chunk-3">
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
                <Card x-chunk="dashboard-07-chunk-3">
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
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Gambar</CardTitle>
                    <CardDescription>
                      Silahkan tambahkan gambar produk
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={
                          gambar
                            ? `https://zezcwsgmgesmhbaaghqf.supabase.co/storage/v1/object/public/altri/${gambar[0].image}`
                            : "/next.svg"
                        }
                        width="300"
                        priority
                      />
                      <div className="grid grid-cols-3 gap-2">
                        {gambar?.map((item) => (
                          <div
                            key={item.id}
                            className="relative group"
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                          >
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="300"
                              src={
                                "https://zezcwsgmgesmhbaaghqf.supabase.co/storage/v1/object/public/altri/" +
                                item.image
                              }
                              width="300"
                            />
                            {isHover && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg transition-opacity duration-300 ease-in-out">
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                                  aria-label="Delete image"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                        {gambar && gambar?.length < 3 && (
                          <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 md:hidden">
              <Button
                type="button"
                variant="outline"
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
