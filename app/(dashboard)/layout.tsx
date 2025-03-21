import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
    </ThemeProvider>
  );
}
