import { Link } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TestPlanNav({
  title,
  description,
  icon: Icon,
  actionLabel,
  actionHref,
}: {
  title: string
  description: string
  icon: React.ElementType
  actionLabel: string
  actionHref: string
}) {
  return (
    <Card className="bg-field p-6 dark:bg-neutral-950">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <Button variant="link" className="mt-4 p-0" asChild>
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </Card>
  )
}
