import { DataTable } from "@/components/datatable/data-table";
import { createServerAdmin } from "@/utils/supabase/admin";
import { columns, User } from "./columns";

const UserList = async () => {
  const supabase = createServerAdmin();
  const { data } = await supabase.from("profiles").select("*");
  return (
    <DataTable
      title="Data Pengguna"
      searchPlaceholder="email pengguna"
      columns={columns}
      search="email"
      data={data || []}
    >
    </DataTable>
  );
};

export default UserList;
