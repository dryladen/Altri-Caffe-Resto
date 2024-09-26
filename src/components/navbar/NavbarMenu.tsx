"use client";
import React, { useContext, useState } from "react";
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
import { navigation } from "@/lib/navigation";
import UserContext from "@/lib/UserContext";
type UserRole = keyof typeof navigation;

const NavbarMenu = () => {
  const pathname = usePathname();
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const [isOpen, setIsOpen] = useState(false);
  const { user, userLoaded } = useContext(UserContext);
  return (
    <div className="">
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
          <nav className="grid gap-4 mt-4 text-lg font-medium">
            {user?.user_role &&
              navigation[user?.user_role as UserRole].map((item) => (
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
    </div>
  );
};

export default NavbarMenu;
