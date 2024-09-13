import { DataTable } from "@/components/datatable/data-table";
import { getProducts } from "@/lib/queries";
import React from "react";
import { columns } from "./columns";
import ProductForm from "./ProductForm";

const ProductList = async () => {
  const data = await getProducts();
  return (
    <DataTable columns={columns} data={data || []}>
      <ProductForm
        defaultValues={{
          mode: "create",
          name: "",
          description: "-",
          price: 0,
          status: "tersedia",
          categoryId: "",
        }}
      />
    </DataTable>
  );
};

export default ProductList;
