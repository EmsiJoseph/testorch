"use client"

import { useCallback } from "react"
import { GridIcon, ListIcon } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

import { updateURLParams } from "@/lib/utils/update-url-params"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ViewToggle() {
  const router = useRouter()

  const handleViewToggle = useCallback(
    (view: string) => {
      const newUrl = updateURLParams({ view: view })
      router.push(newUrl)
    },
    [router]
  )

  return (
    <Tabs defaultValue="grid">
      <TabsList className="h-10 border border-muted/100 bg-field dark:bg-neutral-950">
        <TabsTrigger
          value="grid"
          onClick={() => handleViewToggle("grid")}
          className="focus:dark:bg-gray-700"
        >
          <GridIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger
          value="list"
          onClick={() => handleViewToggle("list")}
          className="focus:dark:bg-gray-700"
        >
          <ListIcon className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
