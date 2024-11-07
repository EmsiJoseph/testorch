import { HelpCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function TestSizingSection({
  defaultValues,
}: {
  defaultValues: any
}) {
  return (
    <Card className="bg-field dark:bg-neutral-950">
      <CardHeader>
        <CardTitle>Test Sizing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Configure the number of virtual users and their scaling rate.
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <label htmlFor="workers" className="text-sm font-medium">
                  Workers to launch (Load Generators)
                </label>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended: 1 worker per 10,000 users
              </p>
              <Input
                type="number"
                id="workers"
                defaultValue={defaultValues.workers || 1}
                className="max-w-[200px]"
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <label htmlFor="users" className="text-sm font-medium">
                  Users to simulate
                </label>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Peak virtual users (VUs)
              </p>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  id="users"
                  defaultValue={defaultValues.users || 50}
                  className="max-w-[200px]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <label htmlFor="spawn-rate" className="text-sm font-medium">
                  Spawn rate of users
                </label>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Per second, recommended 2% of VUs
              </p>
              <Input
                type="number"
                id="spawn-rate"
                defaultValue={defaultValues.spawnRate || 10}
                className="max-w-[200px]"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
