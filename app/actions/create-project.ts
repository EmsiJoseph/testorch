"use server"

import { UploadTestPlanSchema } from "@/schemas/test-plan"
import { AxiosResponse } from "axios"
import { flattenValidationErrors } from "next-safe-action"

import {
  TestorchAxiosConfig
} from "@/config/backend-axios-config"
import { postUploadTestPlanRoute } from "@/config/endpoints/test-plan-management-routes"
import { handleServerSideApiResponse } from "@/lib/handlers/handle-server-side-api-response"
import { handleSetAuthToken } from "@/lib/handlers/handle-set-auth-token"
import { actionClient } from "@/lib/safe-action"
import { IUploadTestPlanResponse } from "@/lib/interfaces/test-plan.interfaces"
import { CreateProjectSchema } from "@/schemas/project"
import { ICreateProjectResponse } from "@/lib/interfaces/project.interfaces"
import { creaeteProjectRoute } from "@/config/endpoints/project-management-routes"

export const createProject = actionClient
  .schema(CreateProjectSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput,
    }: {
      parsedInput: { name: string; auth0_org_id: string; email: string; description: string }
    }) => {
      const request = async (): Promise<
        AxiosResponse<ICreateProjectResponse>
      > => {
        await handleSetAuthToken()

        return await TestorchAxiosConfig.post<ICreateProjectResponse>(
          creaeteProjectRoute,
          {
            name: parsedInput.name,
            auth0_org_id: parsedInput.auth0_org_id,
            description: parsedInput.description,
            email: parsedInput.email,
          }
        )
      }

      return await handleServerSideApiResponse({
        request,
        successMessage: "Project created successfully!",
        errorMessage: "Failed to create project.",
      })
    }
  )
