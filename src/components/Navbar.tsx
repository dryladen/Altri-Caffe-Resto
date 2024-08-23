import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
const Navbar = () => {
  return (
    <>
      <nav className="p-4 shadow-sm">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 justify-center items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="p-1 bg-black rounded-full"
            />
            <span className="font-bold text-2xl text">Altri</span>
          </div>
          <div className="flex gap-4 items-center">
            <ShoppingCart size={24} className=""/>
            {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
            <div className="flex items-center">
              <Menu size={32} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
