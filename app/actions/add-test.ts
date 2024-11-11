"use server"

import { AddTestSchema } from "@/schemas/test-plan"
import { flattenValidationErrors } from "next-safe-action"

import { TestorchAxiosConfig } from "@/config/backend-axios-config"
import { postUploadTestPlanRoute } from "@/config/endpoints/test-plan-management-routes"
import { handleServerSideApiResponse } from "@/lib/handlers/handle-server-side-api-response"
import { handleSetAuthToken } from "@/lib/handlers/handle-set-auth-token"
import { IUploadTestPlanResponse } from "@/lib/interfaces/test-plan.interfaces"
import { actionClient } from "@/lib/safe-action"
import { AxiosResponse } from "axios"

export const addTest = actionClient
  .schema(AddTestSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput,
    }: {
      parsedInput: {
        name: string
        file: string
        fileName: string
        email: string
        projectName: string
        type: string
      }
    }) => {
      const request = async (): Promise<
        AxiosResponse<IUploadTestPlanResponse>
      > => {
        await handleSetAuthToken()

        return await TestorchAxiosConfig.post<IUploadTestPlanResponse>(
          postUploadTestPlanRoute,
          {
            name: parsedInput.name,
            file: parsedInput.file,
            fileName: parsedInput.fileName,
            email: parsedInput.email,
            projectName: parsedInput.projectName,
            type: parsedInput.type,
          }
        )
      }

      return await handleServerSideApiResponse({
        request,
        successMessage: "Test plan added successfully!",
        errorMessage: "Failed to add test plan.",
      })
    }
  )
