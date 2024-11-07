"use server"

import { AddTestSchema } from "@/schemas/test-plan"
import { flattenValidationErrors } from "next-safe-action"

import { actionClient } from "@/lib/safe-action"

export const addTest = actionClient
  .schema(AddTestSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput,
    }: {
      parsedInput: { userEmail: string; testName: string }
    }) => {}
  )
