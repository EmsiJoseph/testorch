import { useEffect } from "react"
import { useFormContext } from "react-hook-form"

import { addTestPlanFormIsSubmitting } from "@/lib/signals"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function TestDescSection() {
  const form = useFormContext()

  return (
    <Card className="w-[400px] bg-field dark:bg-neutral-950">
      <CardHeader>
        <CardTitle>Test Description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Provide a simple description of your test plan to help others
          understand its purpose and scope.
        </p>
        <div className="flex gap-4">
          <FormField
            disabled={addTestPlanFormIsSubmitting.value}
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    {...field}
                    className="max-w-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
