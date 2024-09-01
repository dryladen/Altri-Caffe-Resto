"use client"
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/lib/navigation";
import { usePathname } from "next/navigation";
const SideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col grow items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 p-1 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image src="/logo.png" alt="logo" className="transition-all group-hover:scale-110 w-auto" width={64} height={64} />
          <span className="sr-only">Altri Caffe & Resto</span>
        </Link>
        {navigation.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${pathname === item.href ? "text-white bg-primary" : "text-muted-foreground"}`}
              >
                <item.icon className="h-5 w-5  hover:scale-[1.15]" />
                <span className="sr-only">{item.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Pengaturan</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Pengaturan</TooltipContent>
        </Tooltip>
      </nav> */}
    </aside>
  );
};

export default SideBar;
