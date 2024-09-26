"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserContext from "@/lib/UserContext";
import { toast } from "@/components/ui/use-toast";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const { user: dataUser } = useContext(UserContext);
  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();
      if (error && status !== 406) {
        // console.log(error);
        throw error;
      }
      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast({ title: "Profile updated successfully" });
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full">
      <div className="space-y-6">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-4">
            <Avatar
              uid={user?.id ?? null}
              url={avatar_url}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ fullname, username, website, avatar_url: url });
              }}
            />
            <div className="space-y-1.5">
              <h1 className="text-lg sm:text-2xl font-bold">{fullname}</h1>
              <p className="text-gray-500 dark:text-gray-400 capitalize">
                {dataUser?.user_role}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Informasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name">Nama Lengkap</Label>
                <Input
                  id="full_name"
                  placeholder="Masukan nama anda"
                  value={`${fullname}`}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Masukan email"
                  type="email"
                  defaultValue={`${user?.email}`}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <Button
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading}
            type="submit"
          >
            {loading ? "Loading ..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
