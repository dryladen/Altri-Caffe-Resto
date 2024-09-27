import { DataTable } from "@/components/datatable/data-table";
import { createServerAdmin } from "@/utils/supabase/admin";
import { columns } from "./columns";
import { createClient } from "@/utils/supabase/server";
import { Heading1 } from "lucide-react";

type User = {
  id: string;
  updated_at: string;
  username: string;
  avatar_url: string;
  email: string;
  user_roles: { id: string; role: string }[];
};

const UserList = async () => {
  const supabase = createServerAdmin();
  const response = await supabase
    .from("profiles")
    .select("*, user_roles(*)");
  console.log(response);
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
