"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for skills
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { id: "1", name: "React", selected: true },
      { id: "2", name: "Vue.js", selected: false },
      { id: "3", name: "Angular", selected: false },
      { id: "4", name: "Next.js", selected: true },
      { id: "5", name: "Tailwind CSS", selected: true },
      { id: "6", name: "CSS", selected: true },
      { id: "7", name: "HTML", selected: true },
      { id: "8", name: "JavaScript", selected: true },
      { id: "9", name: "TypeScript", selected: true },
    ],
  },
  {
    name: "Backend",
    skills: [
      { id: "10", name: "Node.js", selected: true },
      { id: "11", name: "Express", selected: true },
      { id: "12", name: "Django", selected: false },
      { id: "13", name: "Flask", selected: false },
      { id: "14", name: "Ruby on Rails", selected: false },
      { id: "15", name: "PHP", selected: false },
    ],
  },
  {
    name: "Database",
    skills: [
      { id: "16", name: "MongoDB", selected: true },
      { id: "17", name: "MySQL", selected: true },
      { id: "18", name: "PostgreSQL", selected: false },
      { id: "19", name: "Firebase", selected: true },
      { id: "20", name: "Redis", selected: false },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { id: "21", name: "Docker", selected: true },
      { id: "22", name: "Kubernetes", selected: false },
      { id: "23", name: "AWS", selected: true },
      { id: "24", name: "GCP", selected: false },
      { id: "25", name: "Azure", selected: false },
      { id: "26", name: "CI/CD", selected: true },
    ],
  },
]

export function SkillsManager() {
  const [categories, setCategories] = useState(skillCategories)
  const [newSkill, setNewSkill] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggleSkill = (categoryName: string, skillId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.name === categoryName) {
          return {
            ...category,
            skills: category.skills.map((skill) => {
              if (skill.id === skillId) {
                return { ...skill, selected: !skill.selected }
              }
              return skill
            }),
          }
        }
        return category
      }),
    )
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setCategories(
        categories.map((category) => {
          if (category.name === selectedCategory) {
            return {
              ...category,
              skills: [
                ...category.skills,
                {
                  id: `new-${Date.now()}`,
                  name: newSkill.trim(),
                  selected: true,
                },
              ],
            }
          }
          return category
        }),
      )
      setNewSkill("")
    }
  }

  const handleSaveChanges = async () => {
    setIsSubmitting(true)

    try {
      // Here you would call your API to save the skills
      console.log(categories)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Error saving skills:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedSkills = categories.flatMap((category) => category.skills.filter((skill) => skill.selected))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Selected Skills</h3>
        <div className="flex flex-wrap gap-2">
          {selectedSkills.length > 0 ? (
            selectedSkills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="text-sm">
                {skill.name}
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground">No skills selected</p>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <Tabs defaultValue={categories[0].name}>
          <TabsList className="mb-4 flex flex-wrap">
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name} onClick={() => setSelectedCategory(category.name)}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder={`Add new ${category.name} skill`}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddSkill()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddSkill}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2 rounded-md border p-3">
                    <Checkbox
                      id={skill.id}
                      checked={skill.selected}
                      onCheckedChange={() => handleToggleSkill(category.name, skill.id)}
                    />
                    <Label htmlFor={skill.id} className="flex-1 cursor-pointer">
                      {skill.name}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  )
}

