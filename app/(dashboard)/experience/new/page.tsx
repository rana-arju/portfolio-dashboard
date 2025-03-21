import { AddExperienceForm } from "@/components/add-experience-form";


export default function AddExperiencePage() {
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Add New Experience
        </h1>
        <p className="text-muted-foreground">
          Add a new work experience to your portfolio
        </p>
      </div>

      <AddExperienceForm />
    </div>
  );
}
