import type React from "react";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Dashboard",
  description: "Manage your portfolio, blogs, skills, and experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Mobile Header - Only visible on mobile */}
          <MobileHeader />

          <div className="flex justify-between h-screen overflow-hidden">
            {/* Sidebar - Hidden on mobile but can be toggled */}
            <div className="hidden md:block w-64 border-r border-gray-200">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-full overflow-auto">
              {/* Mobile padding to account for fixed header */}
              <div className="h-14 md:hidden" />
              <main className="p-4 md:p-6">{children}</main>
            </div>
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
