import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const MenuSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-2 flex flex-col gap-4 w-full relative p-4 border">
        <Skeleton className="w-full h-10" />
        <div className="flex gap-2">
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-32 h-10" />
          <Skeleton className="hidden sm:flex w-32 h-10" />
          <Skeleton className="hidden sm:flex w-32 h-10" />
          <Skeleton className="hidden sm:flex w-32 h-10" />
          <Skeleton className="hidden sm:flex w-32 h-10" />
        </div>
        <Separator />
        <ScrollArea className="flex flex-col w-full h-svh md:pr-4">
          <Skeleton className="w-32 h-5 mb-4" />
          <div className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border-0 bg-inherit shadow-none">
                <CardHeader className="text-lg font-semibold p-0 rounded-sm shadow-none">
                  <Skeleton className="w-full h-64" />
                </CardHeader>
                <CardContent className="flex flex-col items-start p-0 gap-1 py-2">
                  <Skeleton className="w-full h-2" />
                  <Skeleton className="w-32 h-2" />
                </CardContent>
                <CardFooter className="flex justify-between w-full p-0">
                  <Skeleton className="w-full h-8" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="hidden w-full h-full md:flex md:flex-col gap-4 p-4">
        <Skeleton className="w-44 h-10" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    </div>
  );
};

export default MenuSkeleton;
