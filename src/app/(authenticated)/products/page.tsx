import { columns } from "./components/columns";
import { db } from "@/db";
import { DataTable } from "@/components/datatable/data-table";
import AddData from "./components/AddData";

const page = async () => {
  const data = await db.query.productsTable.findMany();
  return (
    <DataTable columns={columns} data={data}>
      <AddData />
    </DataTable>
  );
};

export default page;
