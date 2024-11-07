import { z } from "zod"

export const UploadTestPlanSchema = z.object({
  file: z.string(),
  fileName: z.string(),
})

export const AddTestSchema = z.object({
  userEmail: z.string().email(),
  testName: z.string(),
})

export type TAddTestFormValues = z.infer<typeof AddTestSchema>
export type TUploadTestPlanFormValues = z.infer<typeof UploadTestPlanSchema>