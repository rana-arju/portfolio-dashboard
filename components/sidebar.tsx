"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/constants";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  return (
    <div className="h-full flex flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          Portfolio Dashboard
        </Link>
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
      <div className="p-4 mt-auto border-t">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || "admin@example.com"}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
