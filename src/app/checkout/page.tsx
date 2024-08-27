import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex items-center gap-4 p-2 w-full">
        <Link className="" href="/">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-bold text-xl">Checkout</h1>
      </div>
    </div>
  );
};

export default page;
