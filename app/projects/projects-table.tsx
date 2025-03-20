"use client"

import { useState } from "react"
import Link from "next/link"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, ExternalLink, MoreHorizontal, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for projects
const data = [
  {
    id: "1",
    title: "E-commerce Platform",
    technologies: ["React", "Node.js", "MongoDB"],
    priority: "high",
    deadline: "2023-12-31",
    live: "https://example.com",
  },
  {
    id: "2",
    title: "Portfolio Website",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    priority: "medium",
    deadline: "2023-11-15",
    live: "https://example.com",
  },
  {
    id: "3",
    title: "Mobile App",
    technologies: ["React Native", "Firebase"],
    priority: "high",
    deadline: "2024-01-20",
    live: "https://example.com",
  },
  {
    id: "4",
    title: "Admin Dashboard",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
    priority: "low",
    deadline: "2023-10-10",
    live: "https://example.com",
  },
  {
    id: "5",
    title: "Blog Platform",
    technologies: ["Gatsby", "GraphQL", "Netlify"],
    priority: "medium",
    deadline: "2023-09-30",
    live: "https://example.com",
  },
]

export function ProjectsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const columns: ColumnDef<(typeof data)[0]>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "technologies",
      header: "Technologies",
      cell: ({ row }) => {
        const technologies = row.getValue("technologies") as string[]
        return (
          <div className="flex flex-wrap gap-1">
            {technologies.slice(0, 2).map((tech) => (
              <Badge key={tech} variant="outline" className="mr-1">
                {tech}
              </Badge>
            ))}
            {technologies.length > 2 && <Badge variant="outline">+{technologies.length - 2}</Badge>}
          </div>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        return (
          <Badge
            className={
              priority === "high"
                ? "bg-red-100 text-red-800 hover:bg-red-100"
                : priority === "medium"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  : "bg-green-100 text-green-800 hover:bg-green-100"
            }
          >
            {priority}
          </Badge>
        )
      },
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => {
        const deadline = new Date(row.getValue("deadline"))
        return <div>{deadline.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const project = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => setDeleteId(project.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const handleDelete = () => {
    // Here you would call your API to delete the project
    console.log(`Deleting project with ID: ${deleteId}`)
    setDeleteId(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter projects..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} project(s) total
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

