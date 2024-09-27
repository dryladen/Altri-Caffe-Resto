"use client";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import SelectBox from "@/components/form-controller/SelectBox";
import { Input } from "@/components/form-controller/input";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { UserSchema } from "@/types";
import { createUser } from "./action";

const UserForm = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<UserSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    let response;
    response = await createUser(data);
    toast({
      title: response.message,
      variant: response.success === true ? "default" : "destructive",
    });
    form.reset();
    router.refresh();
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Tambah Pengguna"
        description="Silahkan masukan data yang ingin ditambahkan."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              control={form.control}
              name="username"
              label="Nama"
              placeholder="Contoh: John Doe"
            />
            <Input
              control={form.control}
              name="email"
              type="email"
              label="Email"
              placeholder="Contoh: johndoe@gmail.com"
            />
            <Input
              control={form.control}
              name="password"
              type="password"
              label="Password"
              placeholder="Minimal 6 karakter"
            />
            <SelectBox
              options={[
                { id: "admin", name: "Admin" },
                { id: "cashier", name: "Kasir" },
                { id: "kitchen", name: "Dapur" },
              ]}
              control={form.control}
              name="role"
              label="Role"
            />
            <Button
              type="submit"
              className="w-full"
              {...(loading && { disabled: true })}
            >
              {loading && <LoaderCircle size={24} className="animate-spin" />}
              Simpan
            </Button>
          </form>
        </Form>
      </ResponsiveDialog>
      <Button className="" onClick={() => setIsOpen(!isOpen)}>
        <PlusCircle className="sm:mr-2" size={16} />
        <span className="hidden sm:flex">Tambah Pengguna</span>
      </Button>
    </>
  );
};

export default UserForm;
