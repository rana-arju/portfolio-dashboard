// Base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Helper function for making API requests
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Something went wrong")
  }

  return response.json()
}

// Projects API
export const projectsAPI = {
  getAll: () => fetchAPI<any[]>("/projects"),
  getById: (id: string) => fetchAPI<any>(`/projects/${id}`),
  create: (data: any) =>
    fetchAPI<any>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchAPI<any>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/projects/${id}`, {
      method: "DELETE",
    }),
}

// Blogs API
export const blogsAPI = {
  getAll: () => fetchAPI<any[]>("/blogs"),
  getById: (id: string) => fetchAPI<any>(`/blogs/${id}`),
  create: (data: any) =>
    fetchAPI<any>("/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchAPI<any>(`/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/blogs/${id}`, {
      method: "DELETE",
    }),
}

// Skills API
export const skillsAPI = {
  getAll: () => fetchAPI<any[]>("/skills"),
  update: (data: any) =>
    fetchAPI<any>("/skills", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}

// Experience API
export const experienceAPI = {
  getAll: () => fetchAPI<any[]>("/experience"),
  getById: (id: string) => fetchAPI<any>(`/experience/${id}`),
  create: (data: any) =>
    fetchAPI<any>("/experience", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchAPI<any>(`/experience/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/experience/${id}`, {
      method: "DELETE",
    }),
}

