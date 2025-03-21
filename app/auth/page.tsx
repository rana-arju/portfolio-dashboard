"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Cookies from "js-cookie";

// Define validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (result.ok) {
        const data = await result.json();
        console.log("data", data.data.accessToken);
        Cookies.set("token", data.data.accessToken, {
          expires: 7, // 7 days
          secure: true,
          sameSite: "Strict",
        });
        localStorage.setItem("token", data.data.accessToken);
        toast.success("Logged in successfully");
        router.push("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Wrap the form with FormProvider */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Enter strong password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Sign in with Email
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
