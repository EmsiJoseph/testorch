import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function TestNameSection({
  defaultName,
}: {
  defaultName: string
}) {
  return (
    <Card className="bg-field dark:bg-neutral-950">
      <CardHeader>
        <CardTitle>Test Name</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          The test name is used for display and reporting purposes. Please
          provide one below.
        </p>
        <div className="flex gap-4">
          <Input
            placeholder="Enter name"
            defaultValue={defaultName}
            className="max-w-md"
          />
        </div>
      </CardContent>
    </Card>
  )
}
