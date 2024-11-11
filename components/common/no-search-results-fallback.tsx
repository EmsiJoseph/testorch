import { FC } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface FallbackProps {
  searchTerm: string
  onClick: () => void
  entity: string
}

export const NoSearchResultsFallback: FC<FallbackProps> = ({
  searchTerm,
  onClick,
  entity,
}) => {
  return (
    <Card className="flex min-h-[calc(100svh-193px)] w-full items-center justify-center rounded-lg border bg-background dark:bg-field p-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-xl font-semibold">No Results Found</h2>
        <p className="text-muted-foreground">
          Your search for{" "}
          <span className="font-semibold">{`"${searchTerm}"`}</span> did not
          return any results.
        </p>
        <Button onClick={onClick} variant="link" className="text-primary">
          New {entity} →
        </Button>
      </div>
    </Card>
  )
}
