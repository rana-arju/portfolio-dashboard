import { BlogForm } from "../blog-form"

export default async function BlogPage({ params }: { params: { id: string } }) {
  const {id} = await params;
  const isNew = id === "new"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{isNew ? "Add New Blog Post" : "Edit Blog Post"}</h1>
        <p className="text-muted-foreground">{isNew ? "Create a new blog post" : "Update your blog post"}</p>
      </div>

      <BlogForm id={isNew ? null : id} />
    </div>
  )
}

