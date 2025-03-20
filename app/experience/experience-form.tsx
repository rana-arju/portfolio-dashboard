"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock experience data for edit mode
const mockExperience = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "Tech Solutions Inc.",
  location: "San Francisco, CA",
  period: "Jan 2021 - Present",
  technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  description: ["Led the frontend team in developing a new e-commerce platform", "Improved site performance by 40%"],
}

// Form schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  period: z.string().min(2, {
    message: "Period must be at least 2 characters.",
  }),
  technologies: z.array(z.string()).min(1, {
    message: "At least one technology is required.",
  }),
  description: z.array(z.string()).min(1, {
    message: "At least one description item is required.",
  }),
})

type ExperienceFormValues = z.infer<typeof formSchema>

export function ExperienceForm({ id }: { id: string | null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTech, setNewTech] = useState("")
  const [newDescription, setNewDescription] = useState("")

  // For edit mode, use the mock data
  const defaultValues = id
    ? mockExperience
    : {
        title: "",
        company: "",
        location: "",
        period: "",
        technologies: [],
        description: [],
      }

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: ExperienceFormValues) {
    setIsSubmitting(true)

    try {
      // Here you would call your API to save the experience
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/experience")
      router.refresh()
    } catch (error) {
      console.error("Error saving experience:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTechnology = () => {
    if (newTech.trim() && !form.getValues().technologies.includes(newTech.trim())) {
      form.setValue("technologies", [...form.getValues().technologies, newTech.trim()])
      setNewTech("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    form.setValue(
      "technologies",
      form.getValues().technologies.filter((t) => t !== tech),
    )
  }

  const handleAddDescription = () => {
    if (newDescription.trim()) {
      form.setValue("description", [...form.getValues().description, newDescription.trim()])
      setNewDescription("")
    }
  }

  const handleRemoveDescription = (index: number) => {
    form.setValue(
      "description",
      form.getValues().description.filter((_, i) => i !== index),
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan 2021 - Present" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveTechnology(tech)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tech}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add technology"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTechnology()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={handleAddTechnology}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <div className="space-y-2 mb-2">
                    {field.value.map((desc, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1 rounded-md border p-3">{desc}</div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleRemoveDescription(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove description</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Textarea
                      placeholder="Add description point"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.ctrlKey) {
                          e.preventDefault()
                          handleAddDescription()
                        }
                      }}
                    />
                    <div className="flex justify-end">
                      <Button type="button" variant="outline" size="sm" onClick={handleAddDescription}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Description Point
                      </Button>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/experience")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {id ? "Update Experience" : "Add Experience"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

