import { DataTable } from "@/components/datatable/data-table";
import { createServerAdmin } from "@/utils/supabase/admin";
import { columns } from "./columns";
import { createClient } from "@/utils/supabase/server";
import { Heading1 } from "lucide-react";

const UserList = async () => {
  const supabase = createServerAdmin();
  const data = await supabase.from("user_roles").select("*");
  console.log(data);
  return (
    // <DataTable
    //   title="Users"
    //   searchPlaceholder="nama user"
    //   columns={columns}
    //   search="email"
    //   data={data.data.users || []}
    // ></DataTable>
    <h1>Users</h1>
  );
};

export default UserList;
