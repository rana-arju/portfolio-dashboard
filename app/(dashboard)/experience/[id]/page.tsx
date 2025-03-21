import { EditExperienceForm } from "@/components/edit-experience-form";


export default async function EditExperiencePage({
  params,
}: {
  params: { id: string };
}) {
  const {id} = await params;
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
        <p className="text-muted-foreground">Update your work experience</p>
      </div>

      <EditExperienceForm id={id} />
    </div>
  );
}
