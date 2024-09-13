"use server";
import { Suspense } from "react";
import AvatarWidget from "./AvatarWidget";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  return (
    <header className="sticky bg-white shadow-sm py-2 top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6">
      <NavbarMenu />
      <Suspense fallback={<div>Loading...</div>}>
        <AvatarWidget />
      </Suspense>
    </header>
  );
};

export default Navbar;
