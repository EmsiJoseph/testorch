import { z } from "zod"

export const CreateProjectSchema = z.object({
  file: z.string(),
  fileName: z.string(),
})

export type TCreateProjectFormValues = z.infer<typeof CreateProjectSchema>