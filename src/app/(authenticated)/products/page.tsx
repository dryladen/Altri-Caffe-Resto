import { columns } from "./columns";
import { db } from "@/db";
import { DataTable } from "@/components/datatable/data-table";

const page = async () => {
  const data  = await db.query.productsTable.findMany();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
