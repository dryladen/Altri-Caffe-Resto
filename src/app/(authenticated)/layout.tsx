import SideBar from "@/components/SideBar";
import Navbar from "@/components/navbar/Navbar";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideBar />
      <div className="flex flex-col sm:gap-6 pb-4 sm:pl-14">
        <Navbar />
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}
