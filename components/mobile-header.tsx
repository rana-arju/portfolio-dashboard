"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/constants";

export function MobileHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex h-14 items-center border-b bg-background px-4 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <span className="ml-4 font-semibold">Portfolio Dashboard</span>
      </header>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            Portfolio Dashboard
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
