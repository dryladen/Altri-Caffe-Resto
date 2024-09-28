"use server";
import { Suspense } from "react";
import AvatarWidget from "./AvatarWidget";
import NavbarMenu from "./NavbarMenu";
import { Skeleton } from "../ui/skeleton";

const Navbar = () => {
  return (
    <header className="sticky sm:static z-10 bg-white shadow-sm w-full py-2 top-0 flex h-14 items-center gap-4 border-b px-4 sm:h-auto sm:border-0 sm:px-6">
      <NavbarMenu />
      <Suspense fallback={<Skeleton className="rounded-full my-1 relative ml-auto p-5"/>}>
        <AvatarWidget />
      </Suspense>
    </header>
  );
};

export default Navbar;
