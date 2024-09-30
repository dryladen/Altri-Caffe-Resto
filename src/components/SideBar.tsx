"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/lib/navigation";
import { usePathname, useRouter } from "next/navigation";
import UserContext from "@/lib/UserContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarSkeleton from "./loading/SidebarSkeleton";
const SideBar = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  type UserRole = keyof typeof navigation;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const renderSidebar = useCallback(() => {
    if (user && user.user_role) setLoading(false);
  }, [user]);

  useEffect(() => {
    renderSidebar();
  }, [renderSidebar]);

  return loading ? (
    <SidebarSkeleton />
  ) : (
    <aside
      className={`sticky top-0 z-10 max-h-screen hidden flex-col border-r bg-background sm:flex ${
        isOpen ? "w-52" : "w-14"
      }`}
    >
      <Link
        href="#"
        className="group flex h-16 shrink-0 items-center justify-center gap-2 px-2  bg-primary text-lg font-semibold text-primary-foreground w-full md:text-base"
      >
        <Image
          src="/logo.png"
          alt="logo"
          className={`${
            isOpen && "hidden"
          } transition-all group-hover:scale-110 w-8 h-8 bg-primary`}
          width={64}
          height={64}
        />
        <span className={`${isOpen ? "flex" : "hidden"}`}>
          Altri Caffe & Resto
        </span>
      </Link>
      <nav className="flex flex-col grow items-center gap-4 px-2 sm:py-4">
        {user?.user_role &&
          navigation[user?.user_role as UserRole].map((item) =>
            isOpen ? (
              <Link
                key={item.name}
                href={item.href}
                className={`flex h-9 items-center  justify-start rounded-lg px-4 text-sm transition-colors md:h-8 gap-2 w-full ${
                  pathname === item.href
                    ? "text-white bg-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5  hover:scale-[1.15]" />
                <span className="">{item.name}</span>
              </Link>
            ) : (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                      pathname === item.href
                        ? "text-white bg-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5  hover:scale-[1.15]" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            )
          )}
      </nav>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            size="icon"
            onClick={toggleSidebar}
            className="absolute -right-3 top-96 z-50 hidden sm:flex w-fit h-fit p-1"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Toggle Sidebar</TooltipContent>
      </Tooltip>
    </aside>
  );
};

export default SideBar;
