"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ExperienceFormBase,
  type ExperienceFormValues,
} from "../components/experience-form-base";

// Default values for a new experience
const defaultValues: ExperienceFormValues = {
  title: "",
  company: "",
  location: "",
  period: "",
  technologies: [],
  description: [],
};

export function AddExperienceForm() {
  const router = useRouter();

  const onSubmit = async (values: ExperienceFormValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Experience added successfully");
        router.push("/experience");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to add experience");
      }
    } catch (error) {
      console.error("Error adding experience:", error);
      toast.error("An error occurred while adding the experience");
      throw error;
    }
  };

  return (
    <ExperienceFormBase
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      submitButtonText="Add Experience"
    />
  );
}
