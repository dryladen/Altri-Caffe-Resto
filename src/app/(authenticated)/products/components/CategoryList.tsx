import { DataTable } from "@/components/datatable/data-table";
import { getAllCategories } from "@/lib/queries";
import React from "react";
import { columnsCategory } from "./columns";

const CategoryList = async () => {
  const data = await getAllCategories();
  return (
    <DataTable
      title="Kategori"
      searchPlaceholder="nama kategori"
      columns={columnsCategory}
      data={data || []}
    />
  );
};

export default CategoryList;
