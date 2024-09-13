import { Suspense } from "react";
import AddCustomer from "./components/AddCustomer";
import CheckoutSkeleton from "@/components/loading/CheckoutSkeleton";

const page = () => {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <AddCustomer />
    </Suspense>
  );
};

export default page;
