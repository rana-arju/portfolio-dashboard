import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { BlogsTable } from "./blogs-table";

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/blogs/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Blog Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>View and manage all your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogsTable />
        </CardContent>
      </Card>
    </div>
  );
}
