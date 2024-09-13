import { createClient } from "@/utils/supabase/server";
import AvatarUser from "./AvatarUser";

const AvatarWidget = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <AvatarUser user={user} />;
};

export default AvatarWidget;
