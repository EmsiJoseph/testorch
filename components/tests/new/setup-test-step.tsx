import { useRouter } from "nextjs-toploader/app"
import { useFormContext } from "react-hook-form"

import { StepProps } from "@/lib/interfaces/project.interfaces"
import { addTestPlanFormIsSubmitting } from "@/lib/signals"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/common/submit-button"
import { Textarea } from "@/components/ui/textarea"

const SetupTestStep: React.FC<StepProps> = ({ prevStep }) => {
  const form = useFormContext()
  const router = useRouter()
  return (
    <div className="text-center p-4">
      <div className="flex flex-col items-center">
        <div className="mb-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Setup your test plan</h2>
          <p className="mb-5 mt-2 text-muted-foreground">
            Configure your test below. For more examples, visit our
            documentation site.
          </p>
        </div>
        <div className="flex flex-col space-y-4 items-center w-full max-w-lg">
          <div className="mb-4 flex w-full items-center">
            <FormLabel
              htmlFor="name"
              className="mr-2 font-semibold text-foreground w-1/3 text-left"
            >
              Test name
            </FormLabel>
            <FormField
              disabled={addTestPlanFormIsSubmitting.value}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col relative">
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      {...field}
                      defaultValue={form.getValues("name")}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-[-25px]" />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 flex w-full items-center">
            <FormLabel
              htmlFor="description"
              className="mr-2 font-semibold text-foreground space-y-2 w-1/3 text-left"
            >
              Description
            </FormLabel>
            <FormField
              disabled={addTestPlanFormIsSubmitting.value}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col relative">
                  <FormControl>
                    <Textarea
                      placeholder="Enter description (optional)"
                      {...field}
                      className="w-full h-24"
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-[-25px]" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex space-x-4">
          <Button
            disabled={addTestPlanFormIsSubmitting.value}
            onClick={prevStep}
            variant="outline"
          >
            Back
          </Button>
          <SubmitButton
            disabled={
              (form.watch("name") === "" && form.watch("fileName") === "") ||
              addTestPlanFormIsSubmitting.value
            }
          >
            Add test
          </SubmitButton>
        </div>
      </div>
    </div>
  )
}

export default SetupTestStep
