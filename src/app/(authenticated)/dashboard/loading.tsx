import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
const loading = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="w-32 h-4" />
              </CardTitle>
              <Skeleton className="w-6 h-6" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-44 h-6" />
              <Skeleton className="w-28 h-4 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="grid gap-2">
              <CardTitle>
                <Skeleton className="w-28 h-6" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-24 h-4" />
              </CardDescription>
            </div>
            <Skeleton className="w-32 h-10" />
          </CardHeader>
          <CardContent>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <div className="flex justify-between w-full p-4">
                  <Skeleton className="w-24 h-6" />
                  <Skeleton className="w-20 h-4" />
                </div>
                <Separator className="w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default loading;
