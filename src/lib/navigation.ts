import { ChartLine, Home, Package, Settings, ShoppingCart, Users } from "lucide-react";


const adminNavigation = [
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
    name: "Laporan",
    href: "/reports",
    icon: ChartLine
  },
  {
    name: "Pengaturan",
    href: "/settings",
    icon: Settings
  },
];

const cashierNavigation = [
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
];

const kitchenNavigation = [
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
];

export const navigation = {
  admin: adminNavigation,
  cashier: cashierNavigation,
  kitchen: kitchenNavigation,
};
