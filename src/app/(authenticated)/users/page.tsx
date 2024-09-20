import TableSkeleton from "@/components/loading/TableSkeleton";
import { Suspense } from "react";
import UserList from "./components/UserList";

const page = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <UserList />
    </Suspense>
  );
};

export default page;
