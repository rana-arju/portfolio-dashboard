"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Editor } from "@tinymce/tinymce-react";

// Form schema
export const blogSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "At least one tag is required.",
  }),
  image: z.string().min(1, {
    message: "Featured image is required.",
  }),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormBaseProps {
  defaultValues: BlogFormValues;
  onSubmit: (values: BlogFormValues) => Promise<void>;
  submitButtonText: string;
}

export function BlogFormBase({
  defaultValues,
  onSubmit,
  submitButtonText,
}: BlogFormBaseProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState("");

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  });

  async function handleSubmit(values: BlogFormValues) {
    setIsSubmitting(true);

    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog post");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !form.getValues().tags.includes(newTag.trim())) {
      form.setValue("tags", [...form.getValues().tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    form.setValue(
      "tags",
      form.getValues().tags.filter((t) => t !== tag)
    );
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadToCloudinary(file);
  

      form.setValue("image", imageUrl);
      toast.success("Featured image upload successful");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey="3artvf4gjeir5vffayx2820znjh2sd4tqv545c6l8f17f39t"
                      initialValue={field.value}
                      init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      onEditorChange={(content) => {
                        field.onChange(content);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddTag}
                    >
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <div className="flex items-center gap-4">
                    {field.value && (
                      <div className="relative rounded-md overflow-hidden w-40 h-40">
                        <img
                          src={field.value || "/placeholder.svg"}
                          alt="Featured image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (e) => handleAddImage(e as any);
                          input.click();
                        }}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : field.value ? (
                          "Change Image"
                        ) : (
                          "Upload Image"
                        )}
                      </Button>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/blogs")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isUploading}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {submitButtonText}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
