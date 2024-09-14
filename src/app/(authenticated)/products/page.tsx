import { Suspense } from "react";
import ProductList from "./components/ProductList";
import TableSkeleton from "@/components/loading/TableSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryList from "./components/CategoryList";

const page = () => {
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="products">Produk</TabsTrigger>
        <TabsTrigger value="categories">Kategori</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <Suspense fallback={<TableSkeleton />}>
          <ProductList />
        </Suspense>
      </TabsContent>
      <TabsContent value="categories">
        <Suspense fallback={<TableSkeleton />}>
          <CategoryList />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default page;
