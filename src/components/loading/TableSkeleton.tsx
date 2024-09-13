import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = () => {
  return (
    <Card className="flex flex-col bg-background h-screen p-6 gap-4 shadow-md rounded-lg border-[1px]">
      <h1>
        <Skeleton className="w-32 h-10" />
      </h1>
      <div className="flex items-center gap-4 justify-between pb-4">
        <Skeleton className="w-full sm:w-80 h-10" />
        <div className="flex gap-4">
          <Skeleton className="w-10 sm:w-32 h-10" />
          <Skeleton className="w-10 sm:w-32 h-10" />
        </div>
      </div>
      <Skeleton className="w-full h-full" />
    </Card>
  );
};

export default TableSkeleton;
