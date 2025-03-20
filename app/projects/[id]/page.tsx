import { ProjectForm } from "../project-form"

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const { id } = await params;
  const isNew = id === "new"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{isNew ? "Add New Project" : "Edit Project"}</h1>
        <p className="text-muted-foreground">
          {isNew ? "Create a new portfolio project" : "Update your portfolio project"}
        </p>
      </div>

      <ProjectForm id={isNew ? null : id} />
    </div>
  )
}

