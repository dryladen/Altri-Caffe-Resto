import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const SidebarSkeleton = () => {
  return (
    <aside
      className="sticky top-0 z-10 max-h-screen hidden flex-col border-r bg-background sm:flex w-52 "
    >
      <Link
        href="#"
        className="group flex h-16 shrink-0 items-center justify-center gap-2 px-2  bg-primary text-lg font-semibold text-primary-foreground w-full md:text-base"
      >
        <span className={`flex`}>
          Altri Caffe & Resto
        </span>
      </Link>
      <nav className="flex flex-col grow items-center gap-4 px-2 sm:py-4">
        {Array.from({ length: 6 }).map((_, index) => (<Skeleton key={index} className="w-full h-8" />))}
      </nav>
    </aside>
  )
}

export default SidebarSkeleton;