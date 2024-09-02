import { columns } from "./components/columns";
import { db } from "@/db";
import { DataTable } from "@/components/datatable/data-table";

const page = async () => {
  const data = await db.query.productsTable.findMany();
  return <DataTable columns={columns} data={data} />;
};

export default page;
