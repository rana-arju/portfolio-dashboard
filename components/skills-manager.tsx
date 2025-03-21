"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export function SkillsManager() {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteSkill, setDeleteSkill] = useState<string | null>(null);
  const [editSkill, setEditSkill] = useState<{
    original: string;
    updated: string;
  } | null>(null);

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/skills`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (data.success && data.data) {
          setSkills(data.data.skills || []);
        } else {
          setError(data.message || "Failed to fetch skills");
          toast.error(data.message || "Failed to fetch skills");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError("An error occurred while fetching skills");
        toast.error("An error occurred while fetching skills");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Add a new skill
  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    // Check if skill already exists
    if (skills.includes(newSkill.trim())) {
      toast.error("This skill already exists");
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedSkills = [...skills, newSkill.trim()];
console.log("updatedSkills", updatedSkills);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/skills`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ skills: updatedSkills }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSkills(updatedSkills);
        setNewSkill("");
        toast.success("Skill added successfully");
      } else {
        toast.error(data.message || "Failed to add skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("An error occurred while adding the skill");
    } finally {
      setIsSubmitting(false);
    }
  };
console.log("new skill", newSkill);

  // Delete a skill
  const handleDeleteConfirm = async () => {
    if (!deleteSkill) return;

    try {
      setIsSubmitting(true);
      const updatedSkills = skills.filter((skill) => skill !== deleteSkill);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/skills`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ skills: updatedSkills }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSkills(updatedSkills);
        toast.success("Skill deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("An error occurred while deleting the skill");
    } finally {
      setIsSubmitting(false);
      setDeleteSkill(null);
    }
  };

  // Update a skill
  const handleUpdateSkill = async () => {
    if (!editSkill || !editSkill.updated.trim()) return;

    // Check if skill already exists
    if (
      editSkill.original !== editSkill.updated &&
      skills.includes(editSkill.updated.trim())
    ) {
      toast.error("This skill already exists");
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedSkills = skills.map((skill) =>
        skill === editSkill.original ? editSkill.updated.trim() : skill
      );
console.log("updatedSkills 2", updatedSkills);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/skills`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ skills: updatedSkills }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSkills(updatedSkills);
        toast.success("Skill updated successfully");
      } else {
        toast.error(data.message || "Failed to update skill");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      toast.error("An error occurred while updating the skill");
    } finally {
      setIsSubmitting(false);
      setEditSkill(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>
            Add, edit, or remove skills from your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add new skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              disabled={isSubmitting}
            />
            <Button
              onClick={handleAddSkill}
              disabled={isSubmitting || !newSkill.trim()}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Add
            </Button>
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center justify-between rounded-md border p-3 bg-card"
              >
                <span className="font-medium truncate">{skill}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      setEditSkill({ original: skill, updated: skill })
                    }
                    disabled={isSubmitting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-pencil"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                    <span className="sr-only">Edit {skill}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                    onClick={() => setDeleteSkill(skill)}
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Delete {skill}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteSkill}
        onOpenChange={(open) => !open && setDeleteSkill(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the skill "{deleteSkill}" from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Skill Dialog */}
      <AlertDialog
        open={!!editSkill}
        onOpenChange={(open) => !open && setEditSkill(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Skill</AlertDialogTitle>
            <AlertDialogDescription>
              Update the skill name below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              value={editSkill?.updated || ""}
              onChange={(e) =>
                setEditSkill((prev) =>
                  prev ? { ...prev, updated: e.target.value } : null
                )
              }
              placeholder="Skill name"
              className="mb-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpdateSkill}
              disabled={isSubmitting || !editSkill?.updated.trim()}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
