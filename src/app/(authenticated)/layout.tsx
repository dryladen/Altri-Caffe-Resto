import SideBar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideBar />
      <div className="flex flex-col sm:gap-6 pb-4 sm:pl-14">
        <Navbar user={user} />
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}
