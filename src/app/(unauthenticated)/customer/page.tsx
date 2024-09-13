import { Suspense } from "react";
import CustomerMenu from "./components/CustomerMenu";
import MenuSkeleton from "@/components/loading/MenuSkeleton";

export default async function Customer() {
  return (
    <div className="">
      <div className="flex flex-col p-4 border shadow-sm">
        <h1 className="text-3xl font-bold text-primary">Altri Caffe & Resto</h1>
        <span className="text-gray-500 text-sm">Buka : 09.00 - 22.00</span>
      </div>
      <Suspense fallback={<MenuSkeleton />}>
        <CustomerMenu />
      </Suspense>
    </div>
  );
}
