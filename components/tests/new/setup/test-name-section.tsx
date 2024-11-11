import { useFormContext } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addTestPlanFormIsSubmitting } from "@/lib/signals"

export default function TestNameSection() {
  const form = useFormContext()

  return (
    <Card className="w-[400px] bg-field dark:bg-neutral-950">
      <CardHeader>
        <CardTitle>Test Name</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          disabled={addTestPlanFormIsSubmitting.value}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
               <FormLabel>Test Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name"
                  {...field}
                  defaultValue={form.getValues("name")}
                  className="max-w-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={addTestPlanFormIsSubmitting.value}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Description</FormLabel>
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
      </CardContent>
    </Card>
  )
}
