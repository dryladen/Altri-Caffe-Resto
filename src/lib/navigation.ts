import { BookCopy, Home, Package, Settings, ShoppingCart, Users } from "lucide-react";


export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home
  },
  {
    name: "Pesanan",
    href: "/orders",
    icon: ShoppingCart
  },
  {
    name: "Produk",
    href: "/products",
    icon: Package
  },
  {
    name: "Pengguna",
    href: "/users",
    icon: Users
  },
  {
    name: "Kategori",
    href: "/categories",
    icon: BookCopy
  },
  {
    name: "Pengaturan",
    href: "/settings",
    icon: Settings
  },
]
