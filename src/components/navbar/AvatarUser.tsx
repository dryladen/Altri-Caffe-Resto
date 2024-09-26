"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useCallback, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import UserContext from "@/lib/UserContext";
import { Badge } from "../ui/badge";
import Image from "next/image";

const AvatarUser = ({ user }: { user: User | null }) => {
  const [avatar_url, setAvatarUrl] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const { user: dataUser } = useContext(UserContext);
  const supabase = createClient();
  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();
      if (error && status !== 406) {
        console.log(error);
        throw error;
      }
      if (data) {
        const { data: gambar, error } = await supabase.storage
          .from("avatars")
          .download(data.avatar_url);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(gambar);
        setAvatarUrl(url);
        setUsername(data.full_name);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.error(error);
    }
  }, [user, supabase]);
  useEffect(() => {
    getProfile();
  }, [user, getProfile]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full my-1 relative ml-auto"
        >
          <Image
            src={avatar_url ? avatar_url : "/user.jpg"}
            alt="Avatar"
            width={100}
            height={100}
            className="avatar image object-cover"
            priority={true}
            style={{ height: 41, width: 41 }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="capitalize">{username}</span>
            <span className="text-gray-500 text-xs">{user?.email}</span>
            <Badge className="capitalize justify-center mt-2">
              {dataUser?.user_role}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full" href="/account">
            Akun
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action="/auth/signout" method="post" className="w-full">
            <button className="button block" type="submit">
              Sign out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarUser;
