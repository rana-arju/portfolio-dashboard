import { AddProjectForm } from "@/components/add-project-form";

export default function AddProjectPage() {
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-muted-foreground">Create a new portfolio project</p>
      </div>

      <AddProjectForm />
    </div>
  );
}
