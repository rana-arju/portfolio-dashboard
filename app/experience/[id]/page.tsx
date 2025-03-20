import { ExperienceForm } from "../experience-form"

export default async function ExperiencePage({ params }: { params: { id: string } }) {
  const {id} = await params;
  const isNew = id === "new"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{isNew ? "Add New Experience" : "Edit Experience"}</h1>
        <p className="text-muted-foreground">{isNew ? "Add a new work experience" : "Update your work experience"}</p>
      </div>

      <ExperienceForm id={isNew ? null : id} />
    </div>
  )
}

