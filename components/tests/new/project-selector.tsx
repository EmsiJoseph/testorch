"use client"

import { useState } from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"
import { useRouter } from "nextjs-toploader/app"
import { useFormContext } from "react-hook-form"

import { IProject } from "@/lib/interfaces/project.interfaces"
import { projectId } from "@/lib/signals"
import { cn } from "@/lib/utils/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface TeamSwitcherProps {
  projects: IProject[]
  currentProjectId: string
}

export function ProjectSelector({
  projects,
  currentProjectId,
}: TeamSwitcherProps) {
  const form = useFormContext()

  const [open, setOpen] = useState(false)

  const project = projects.find((project) => project.id === currentProjectId)!

  const router = useRouter()

  return (
    <div>
      {/* Team Switcher Popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an organization"
            className={cn(
              "flex h-12 w-full min-w-[240px] justify-between rounded-xl border border-border bg-field p-2",
              "hover:border-accent hover:bg-accent/15"
            )}
          >
            {project ? (
              <>
                <Avatar className="mr-2 size-8 rounded-sm">
                  <AvatarFallback className="rounded-sm">
                    {project.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="min-w-16 truncate text-left">
                  {project.name}
                </span>
              </>
            ) : (
              <span className="text-gray-400 ml-2">Select a project</span>
            )}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[240px] rounded-xl p-0">
          {/* Command List */}
          <Command>
            <CommandList>
              <CommandInput placeholder="Search projects..." />
              <CommandEmpty>No project found.</CommandEmpty>

              <CommandGroup heading="Projects">
                {projects.map((proj) => (
                  <CommandItem
                    key={proj.id}
                    onSelect={() => {
                      projectId.value = proj.id
                      form.setValue("projectId", proj.id)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 size-8 rounded-sm">
                      <AvatarFallback className="rounded-sm">
                        {proj.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{proj.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        project
                          ? project.id === proj.id
                            ? "opacity-100"
                            : "opacity-0"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>

            {/* Create Team Button */}
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem className="cursor-pointer">
                  <Button
                    onClick={() => {
                      router.push("/projects/new")
                    }}
                    variant="ghost"
                    className="h-full w-full justify-start"
                  >
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
