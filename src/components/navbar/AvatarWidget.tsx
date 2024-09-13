import { createClient } from "@/utils/supabase/server";
import AvatarUser from "./AvatarUser";

const AvatarWidget = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <AvatarUser user={user} />;
};

export default AvatarWidget;
