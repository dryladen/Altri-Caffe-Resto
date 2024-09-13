import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altri Caffe & Resto",
  description: "Hilangkan penat di Altri Caffe & Resto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen w-full flex-col bg-muted/40 relative">
          <Providers>
            <TooltipProvider>{children}</TooltipProvider>
          </Providers>
        </main>
        <Toaster />
      </body>
    </html>
    // </ClerkProvider>
  );
}
