import {
  ArrowUpRight,
  ChartNoAxesCombined,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getOrders } from "@/lib/queries";
import { TopSellingProduct } from "./components/TopSellingProduct";
import { DailySales } from "./components/DailySales";

const page = async () => {
  const ordersData = await getOrders();
  // filter order by statusOrder and return 10 orders
  const filtered = () => {
    if (ordersData) {
      return ordersData
        .filter((order) => order.statusOrder === "done")
        .slice(0, 5);
    }
    return ordersData;
  };

  const order = filtered();
  if (order)
    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pendapatan
              </CardTitle>
              <ChartNoAxesCombined className="text-muted-foreground text-xs" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumSignificantDigits: 6,
                }).format(
                  order.reduce((acc, curr) => acc + curr.total_payment, 0)
                )}
              </div>
              <p className="text-xs text-muted-foreground">September 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transaksi
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">September 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pendapatan Hari Ini
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 102.000</div>
              <p className="text-xs text-muted-foreground">
                Senin, 29 September 2024
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <DailySales />
          <TopSellingProduct />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <Card className="">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transaksi</CardTitle>
                <CardDescription>
                  Transaksi terkini dari toko anda.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/orders">
                  Lihat Semua
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Tanggal
                    </TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{item.username}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {item.phone}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumSignificantDigits: 6,
                        }).format(item.total_payment)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Terjual</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, name: "Product A", sold: 100, price: "$10.00" },
                    { id: 2, name: "Product B", sold: 85, price: "$15.50" },
                    { id: 3, name: "Product C", sold: 70, price: "$20.00" },
                    { id: 4, name: "Product D", sold: 65, price: "$25.75" },
                  ].map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.sold}</TableCell>
                      <TableCell>{product.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </>
    );
};

export default page;
