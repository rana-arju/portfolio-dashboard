"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock project data for edit mode
const mockProject = {
  id: "1",
  title: "E-commerce Platform",
  images: ["https://via.placeholder.com/300"],
  technologies: ["React", "Node.js", "MongoDB"],
  frontend: "React, Redux, Tailwind CSS",
  server: "Node.js, Express, MongoDB",
  description:
    "A full-featured e-commerce platform with user authentication, product management, cart functionality, and payment processing.",
  live: "https://example.com",
  deadline: "2023-12-31",
  priority: "high",
}

// Form schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required.",
  }),
  technologies: z.array(z.string()).min(1, {
    message: "At least one technology is required.",
  }),
  frontend: z.string().optional(),
  server: z.string().optional(),
  description: z.string().optional(),
  live: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  deadline: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
})

type ProjectFormValues = z.infer<typeof formSchema>

export function ProjectForm({ id }: { id: string | null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTech, setNewTech] = useState("")

  // For edit mode, use the mock data
  const defaultValues = id
    ? mockProject
    : {
        title: "",
        images: [],
        technologies: [],
        frontend: "",
        server: "",
        description: "",
        live: "",
        deadline: "",
        priority: "medium",
      }

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: ProjectFormValues) {
    setIsSubmitting(true)

    try {
      // Here you would call your API to save the project
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/projects")
      router.refresh()
    } catch (error) {
      console.error("Error saving project:", error)
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

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would upload the image to a server and get a URL
    // For this example, we'll just use a placeholder
    form.setValue("images", [...form.getValues().images, "https://via.placeholder.com/300"])
  }

  const handleRemoveImage = (index: number) => {
    form.setValue(
      "images",
      form.getValues().images.filter((_, i) => i !== index),
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
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="frontend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frontend</FormLabel>
                    <FormControl>
                      <Input placeholder="Frontend technologies" {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated list of frontend technologies</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="server"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server</FormLabel>
                    <FormControl>
                      <Input placeholder="Server technologies" {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated list of server technologies</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project description" className="min-h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="live"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {field.value.map((image, index) => (
                      <div key={index} className="relative rounded-md overflow-hidden aspect-video">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Project image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    ))}
                    <div className="border border-dashed rounded-md flex items-center justify-center aspect-video">
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                        <Plus className="h-6 w-6 mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Add Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleAddImage} />
                      </label>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/projects")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {id ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

