import { Suspense } from "react";
import MenuOrder from "./components/MenuOrder";
import MenuHeader from "./components/MenuHeader";
import MenuSkeleton from "@/components/loading/MenuSkeleton";

export default async function Home() {
  return (
    <>
      <MenuHeader />
      <Suspense fallback={<MenuSkeleton />}>
        <MenuOrder />
      </Suspense>
    </>
  );
}
