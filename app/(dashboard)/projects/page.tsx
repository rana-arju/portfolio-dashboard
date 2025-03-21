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
import { ProjectsTable } from "./projects-table";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            View and manage all your portfolio projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectsTable />
        </CardContent>
      </Card>
    </div>
  );
}
