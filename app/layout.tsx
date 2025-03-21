import type React from "react";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/auth-context";

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
        <main className="p-4 md:p-6">
          <AuthProvider>{children}</AuthProvider>
        </main>

        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
