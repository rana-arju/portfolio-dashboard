"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  BlogFormBase,
  type BlogFormValues,
} from "../components/blog-form-base";

// Default values for a new blog post
const defaultValues: BlogFormValues = {
  title: "",
  content: "",
  tags: [],
  image: "",
};

export function AddBlogForm() {
  const router = useRouter();

  const onSubmit = async (values: BlogFormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Blog post created successfully");
        router.push("/blogs");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("An error occurred while creating the blog post");
      throw error;
    }
  };

  return (
    <BlogFormBase
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      submitButtonText="Create Blog Post"
    />
  );
}
