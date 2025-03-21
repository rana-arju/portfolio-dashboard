"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { ExperienceFormBase, ExperienceFormValues } from "./experience-form-base";

// Default empty values
const emptyValues: ExperienceFormValues = {
  title: "",
  company: "",
  location: "",
  period: "",
  technologies: [],
  description: [],
};

export function EditExperienceForm({ id }: { id: string }) {
  const router = useRouter();
  const [experience, setExperience] = useState<ExperienceFormValues | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/experiance/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (data.success && data.data) {
          // Transform the API data to match our form schema if needed
          setExperience({
            title: data.data.title || "",
            company: data.data.company || "",
            location: data.data.location || "",
            period: data.data.period || "",
            technologies: data.data.technologies || [],
            description: data.data.description || [],
          });
        } else {
          setError(data.message || "Failed to fetch experience");
          toast.error(data.message || "Failed to fetch experience");
        }
      } catch (error) {
        console.error("Error fetching experience:", error);
        setError("An error occurred while fetching the experience");
        toast.error("An error occurred while fetching the experience");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const onSubmit = async (values: ExperienceFormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/experiance/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Experience updated successfully");
        router.push("/experience");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update experience");
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      toast.error("An error occurred while updating the experience");
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">
          {error || "Failed to load experience"}
        </p>
        <button
          onClick={() => router.push("/experience")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Back to Experience
        </button>
      </div>
    );
  }

  return (
    <ExperienceFormBase
      defaultValues={experience}
      onSubmit={onSubmit}
      submitButtonText="Update Experience"
    />
  );
}
