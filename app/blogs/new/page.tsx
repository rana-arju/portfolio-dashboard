import { AddBlogForm } from "@/components/add-blog-form";

export default function AddBlogPage() {
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Blog Post</h1>
        <p className="text-muted-foreground">
          Create a new blog post for your portfolio
        </p>
      </div>

      <AddBlogForm />
    </div>
  );
}
