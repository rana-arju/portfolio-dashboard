"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  BlogFormBase,
  type BlogFormValues,
} from "../components/blog-form-base";
import { Skeleton } from "@/components/ui/skeleton";

// Default empty values
const emptyValues: BlogFormValues = {
  title: "",
  content: "",
  tags: [],
  image: "",
};

export function EditBlogForm({ id }: { id: string }) {
  const router = useRouter();
  const [blog, setBlog] = useState<BlogFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (data.success && data.data) {
          // Transform the API data to match our form schema if needed
          setBlog({
            title: data.data.title || "",
            content: data.data.content || "",
            tags: data.data.tags || [],
            image: data.data.image || "",
          });
        } else {
          setError(data.message || "Failed to fetch blog post");
          toast.error(data.message || "Failed to fetch blog post");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("An error occurred while fetching the blog post");
        toast.error("An error occurred while fetching the blog post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const onSubmit = async (values: BlogFormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Blog post updated successfully");
        router.push("/blogs");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update blog post");
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast.error("An error occurred while updating the blog post");
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">
          {error || "Failed to load blog post"}
        </p>
        <button
          onClick={() => router.push("/blogs")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <BlogFormBase
      defaultValues={blog}
      onSubmit={onSubmit}
      submitButtonText="Update Blog Post"
    />
  );
}
