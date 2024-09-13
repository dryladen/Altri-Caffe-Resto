"use client";
import { PanelLeft } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigation } from "@/lib/navigation";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import Avatar from "@/app/(authenticated)/account/avatar";

const Navbar = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const supabase = createClient();
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        setUsername(data.username);
      }
    } catch (error) {
      alert("Error loading user data!");
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky bg-white shadow-sm py-2 top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
              <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 p-1 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Image
                  src="/logo.png"
                  alt="logo"
                  className="transition-all group-hover:scale-110 w-auto"
                  width={64}
                  height={64}
                />
                <span className="sr-only">Altri Caffe & Resto</span>
              </Link>
              Altri Caffe & Resto
            </SheetTitle>
            <SheetDescription className="text-start">Navigasi</SheetDescription>
          </SheetHeader>
          <nav className="grid gap-4 mt-4 text-lg font-medium ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 p-2.5 ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                } rounded-lg`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {pathNames.map((path, index) => (
            <div key={path} className="flex items-center">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${pathNames.slice(0, index + 1).join("/")}`}>
                    <span className="capitalize">{path}</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== pathNames.length - 1 && (
                <BreadcrumbSeparator className="ml-3" />
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full my-1 relative ml-auto"
          >
            <Avatar uid={user?.id ?? null} url={avatar_url} size={41} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="capitalize">{username}</span>
              <span className="text-gray-500 text-xs">{user?.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link className="w-full" href="/account">Akun</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action="/auth/signout" method="post" className="w-full">
              <button className="button block" type="submit">
                Sign out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Navbar;
