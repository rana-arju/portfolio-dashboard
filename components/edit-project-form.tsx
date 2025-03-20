"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ProjectFormBase,
  type ProjectFormValues,
} from "../components/project-form-base";
import { Skeleton } from "@/components/ui/skeleton";

// Default empty values
const emptyValues: ProjectFormValues = {
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

export function EditProjectForm({ id }: { id: string }) {
  const router = useRouter();
  const [project, setProject] = useState<ProjectFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (data.success && data.data) {
          // Transform the API data to match our form schema if needed
          setProject({
            title: data.data.title || "",
            images: data.data.images || [],
            technologies: data.data.technologies || [],
            frontend: data.data.frontend || "",
            server: data.data.server || "",
            description: data.data.description || "",
            live: data.data.live || "",
            deadline: data.data.deadline || "",
            priority: data.data.priority || "medium",
          });
        } else {
          setError(data.message || "Failed to fetch project");
          toast.error(data.message || "Failed to fetch project");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("An error occurred while fetching the project");
        toast.error("An error occurred while fetching the project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/project/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Project updated successfully");
        router.push("/projects");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("An error occurred while updating the project");
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error || "Failed to load project"}</p>
        <button
          onClick={() => router.push("/projects")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <ProjectFormBase
      defaultValues={project}
      onSubmit={onSubmit}
      submitButtonText="Update Project"
    />
  );
}
