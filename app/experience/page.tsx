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
import { ExperienceTable } from "./experience-table";

export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">Manage your work experience</p>
        </div>
        <Button asChild>
          <Link href="/experience/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Experience</CardTitle>
          <CardDescription>
            View and manage all your work experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceTable />
        </CardContent>
      </Card>
    </div>
  );
}
