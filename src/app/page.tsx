import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HandPlatter, User } from "lucide-react";

export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col p-4 shadow-md rounded-md gap-4">
        <div>
          <h1 className="text-4xl font-bold ">Altri Caffe & Resto</h1>
          <span className="text-gray-500">
            Selamat datang di Altri Caffe & Resto
          </span>
        </div>
        <Link href="/customer">
          <Button className="w-full text-lg flex gap-2" variant="default">
            <User size={21} />
            Pelanggan
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button className="w-full text-lg flex gap-2 items-center" variant="default">
            <HandPlatter size={21} />
            Kasir
          </Button>
        </Link>
      </div>
    </div>
  );
}
