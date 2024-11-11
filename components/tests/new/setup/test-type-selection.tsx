import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestTypeSelection({
  testTypes,
  onSelect,
}: {
  testTypes: { name: string; icon: React.ElementType }[]
  onSelect: (type: string) => void
}) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleSelect = (type: string) => {
    setSelectedType(type)
    onSelect(type)
  }

  return (
    <Card className="bg-field dark:bg-neutral-950">
      <CardHeader>
        <CardTitle>Select Test Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Choose the type of test you want to perform.
        </p>
        <div className="flex flex-wrap gap-4">
          {testTypes.map(({ name, icon: Icon }) => (
            <Button
              key={name}
              variant={selectedType === name ? "default" : "outline"}
              onClick={() => handleSelect(name)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
