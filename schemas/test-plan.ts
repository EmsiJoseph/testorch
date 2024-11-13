import { z } from "zod"

export const StartTestPlanSchema = z.object({
  fileName: z.string(),
  workerNodes: z.number(),
})

export const UploadTestPlanSchema = z.object({
  file: z.string(),
  fileName: z.string(),
})

export const AddTestSchema = z.object({
  name: z.string(),
  file: z.string(),
  fileName: z.string(),
  email: z.string(),
  projectName: z.string(),
  type: z.string(),
})

export const AddTestSchemaV2 = z.object({
  name: z.string().max(50),
  file: z.string(),
  description: z.string().max(100).optional(),
  fileName: z.string(),
  email: z.string(),
  projectName: z.string(),
  type: z.string(),
  auth0_org_id: z.string(),
})

export const StartTestPlanSchemaV2 = z.object({
  testPlanName: z.string(),
  email: z.string(),
  auth0_org_id: z.string(),
  workerNodes: z.number(),
  projectName: z.string(),
  protocol: z.string(),
  host: z.string(),
  basePath: z.string(),
  threadCount: z.number(),
  startUpTime: z.number(),
  holdLoadTime: z.number(),
  shutdownTime: z.number(),
  targetThroughputPerMin: z.number(),
})

export type TAddTestFormValues = z.infer<typeof AddTestSchema>
export type TUploadTestPlanFormValues = z.infer<typeof UploadTestPlanSchema>
export type TStartTestPlanFormValues = z.infer<typeof StartTestPlanSchema>
export type TAddTestFormValuesV2 = z.infer<typeof AddTestSchemaV2>
export type TStartTestPlanFormValuesV2 = z.infer<typeof StartTestPlanSchemaV2>
