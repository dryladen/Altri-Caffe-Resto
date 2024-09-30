import { createServerAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import UserData from "./components/UserData";

type Props = {
  params: {
    uuid: string;
  };
};

export default async function page({ params }: Props) {
  const supabase = createClient();

  const { data } = await supabase
    .from("profiles")
    .select()
    .eq("id", params.uuid);
  return (
    <div>
      <UserData />
    </div>
  );
}
