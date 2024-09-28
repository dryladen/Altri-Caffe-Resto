"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { racik: "Product A", sales: 4000 },
  { racik: "Product B", sales: 3000 },
  { racik: "Product C", sales: 2000 },
];

const chartConfig = {
  sales: {
    label: "Penjualan",
    color: "#F97316",
  },
} satisfies ChartConfig;

export function TopSellingProduct() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Penjualan Produk Terbanyak</CardTitle>
        <CardDescription>1 September - 30 September 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="racik"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" fill="#F97316" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
