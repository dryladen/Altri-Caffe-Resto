import { DataTable } from "@/components/datatable/data-table";
import { createServerAdmin } from "@/utils/supabase/admin";
import { columns } from "./columns";
import UserForm from "./UserForm";

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
      <UserForm
        defaultValues={{
          mode: "create",
          username: "",
          email: "",
          password: "",
          role: "",
        }}
      />
    </DataTable>
  );
};

export default UserList;
