"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";
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
import { createProduct, updateProduct } from "../../components/action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/form-controller/input";
import SelectBox from "@/components/form-controller/SelectBox";
import { Form } from "@/components/ui/form";
import { revalidatePath } from "next/cache";
type Props = {
  defaultValues: ProductSchema;
  categoriesData: { id: number; name: string }[] | null;
  idProduk: number;
};

const FormDetails = ({ defaultValues, categoriesData, idProduk }: Props) => {
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Link href="/products">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Kembali</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Produk
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
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
                      { id: "available", name: "Available" },
                      { id: "unavailable", name: "Unavailable" },
                    ]}
                    control={form.control}
                    name="status"
                    label="Status"
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
                    name="categoryId"
                    label="Kategori"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Gambar</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="300"
                      src="/placeholder.svg"
                      width="300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <button>
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src="/placeholder.svg"
                          width="84"
                        />
                      </button>
                      <button>
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src="/placeholder.svg"
                          width="84"
                        />
                      </button>
                      <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Hapus
            </Button>
            <Button type="submit" size="sm">
              Simpan
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FormDetails;
