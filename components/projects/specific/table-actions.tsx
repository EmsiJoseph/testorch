"use client"

import { Button } from "@/components/ui/button"
import { Play, Edit3, Trash2 } from "lucide-react"

export default function TableActions({
  onLaunch,
  onEdit,
  onDelete,
}: {
  onLaunch: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex items-center rounded-md border bg-background">
      <Button
        variant="ghost"
        size="sm"
        onClick={onLaunch}
        className="rounded-none rounded-l-md px-3 hover:bg-accent"
      >
        <Play className="mr-2 h-4 w-4" />
        Launch Test
      </Button>
      <div className="h-4 w-full bg-border" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="rounded-none px-5 hover:bg-accent" // Increased padding from px-3 to px-5
      >
        Edit
      </Button>
      <div className="h-4 w-full bg-border" />
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
        className="rounded-none rounded-r-md px-2 hover:bg-accent"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
