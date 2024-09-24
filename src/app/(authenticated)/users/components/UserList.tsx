import { createClient } from "@/utils/supabase/server";

const UserList = async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getSession();
  return <div>{JSON.stringify(user.data.session?.user.user_metadata)}</div>;
};

export default UserList;
