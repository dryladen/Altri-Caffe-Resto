"use server";
import { Suspense } from "react";
import AvatarWidget from "./AvatarWidget";
import NavbarMenu from "./NavbarMenu";
import { Skeleton } from "../ui/skeleton";

const Navbar = () => {
  return (
    <header className="sticky bg-white shadow-sm py-2 top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6">
      <NavbarMenu />
      <Suspense fallback={<Skeleton className="rounded-full my-1 relative ml-auto p-5"/>}>
        <AvatarWidget />
      </Suspense>
    </header>
  );
};

export default Navbar;
