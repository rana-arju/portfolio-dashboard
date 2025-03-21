"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();



  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage and cookies
        localStorage.setItem("token", data.data.accessToken);
        Cookies.set("token", data.data.accessToken, { expires: 7 }); // 1 day

        setIsAuthenticated(true);
        setUser(data.user);

        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear token from localStorage and cookies
    localStorage.removeItem("token");
    Cookies.remove("token");

    setIsAuthenticated(false);
    setUser(null);

    toast.success("Logged out successfully");
    router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
