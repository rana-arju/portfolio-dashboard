import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkillsManager } from "./skills-manager";

export default function SkillsPage() {
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
        <p className="text-muted-foreground">
          Manage your skills and competencies
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills Management</CardTitle>
          <CardDescription>
            Add, update, or remove skills from your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SkillsManager />
        </CardContent>
      </Card>
    </div>
  );
}
