import { columns } from "./components/columns";
import { db } from "@/db";
import { DataTable } from "@/components/datatable/data-table";
import ProductForm from "./components/ProductForm";

const page = async () => {
  const data = await db.query.productsTable.findMany();
  const categoriesData = await db.query.categoriesTable.findMany({});
  return (
    <DataTable columns={columns} data={data}>
      <ProductForm
        defaultValues={{
          mode: "create",
          name: "",
          description: "-",
          price: 0,
          status: "available",
          categoryId: 2,
        }}
        categoriesData={categoriesData}
      />
    </DataTable>
  );
};

export default page;
