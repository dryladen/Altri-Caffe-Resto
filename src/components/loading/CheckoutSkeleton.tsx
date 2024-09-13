import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

const CheckoutSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-4 w-full p-4 bg-white shadow-sm">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-32 h-5" />
      </div>
      <div className="flex flex-col mt-4 p-4 md:mx-14 grow">
        <Skeleton className="w-44 h-5" />
        <Separator className="mt-2" />
        <div className="flex flex-col py-8">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-32 h-5" />
        </div>
      </div>
      <Separator className="h-4 bg-gray-100" />
      <Skeleton className="w-full h-10" />

      <Skeleton className="w-32 h-5" />
    </>
  );
};

export default CheckoutSkeleton;
