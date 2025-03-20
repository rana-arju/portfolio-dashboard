"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ProjectFormBase,
  type ProjectFormValues,
} from "../components/project-form-base";

// Default values for a new project
const defaultValues: ProjectFormValues = {
  title: "",
  images: [],
  technologies: [],
  frontend: "",
  server: "",
  description: "",
  live: "",
  deadline: "",
  priority: "medium",
};

export function AddProjectForm() {
  const router = useRouter();

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Project created successfully");
        router.push("/projects");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("An error occurred while creating the project");
      throw error;
    }
  };

  return (
    <ProjectFormBase
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      submitButtonText="Create Project"
    />
  );
}
