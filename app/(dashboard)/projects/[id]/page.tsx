import { EditProjectForm } from "@/components/edit-project-form";


export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update your portfolio project</p>
      </div>

      <EditProjectForm id={id} />
    </div>
  );
}
