"use server"

import { AddTestSchemaV2 } from "@/schemas/test-plan"
import { flattenValidationErrors } from "next-safe-action"

import { TestorchAxiosConfig } from "@/config/backend-axios-config"
import { postUploadTestPlanRouteV2 } from "@/config/endpoints/test-plan-management-routes"
import { handleServerSideApiResponse } from "@/lib/handlers/handle-server-side-api-response"
import { handleSetAuthToken } from "@/lib/handlers/handle-set-auth-token"
import { IUploadTestPlanResponse } from "@/lib/interfaces/test-plan.interfaces"
import { actionClient } from "@/lib/safe-action"
import { AxiosResponse } from "axios"

export const addTestV2 = actionClient
  .schema(AddTestSchemaV2, {
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
        auth0_org_id: string
        projectName: string
        type: string
      }
    }) => {
      const request = async (): Promise<
        AxiosResponse<IUploadTestPlanResponse>
      > => {
        await handleSetAuthToken()

        return await TestorchAxiosConfig.post<IUploadTestPlanResponse>(
          postUploadTestPlanRouteV2,
          {
            name: parsedInput.name,
            file: parsedInput.file,
            fileName: parsedInput.fileName,
            email: parsedInput.email,
            projectName: parsedInput.projectName,
            auth0_org_id: parsedInput.auth0_org_id,
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
