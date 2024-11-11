import { z } from "zod"

export const CreateProjectSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(100),
  auth0_org_id: z.string(),
  email: z.string(),
})

export type TCreateProjectFormValues = z.infer<typeof CreateProjectSchema>
