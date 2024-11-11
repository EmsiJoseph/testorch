"use server"

import { StartTestPlanSchema } from "@/schemas/test-plan"
import { AxiosResponse } from "axios"
import { flattenValidationErrors } from "next-safe-action"

import { TestorchAxiosConfig } from "@/config/backend-axios-config"
import {
  postStartTestPlanRoute
} from "@/config/endpoints/test-plan-management-routes"
import { handleServerSideApiResponse } from "@/lib/handlers/handle-server-side-api-response"
import { handleSetAuthToken } from "@/lib/handlers/handle-set-auth-token"
import { actionClient } from "@/lib/safe-action"

export const startTestPlan = actionClient
  .schema(StartTestPlanSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput,
    }: {
      parsedInput: { fileName: string; workerNodes: number }
    }) => {
      const request = async (): Promise<AxiosResponse<any>> => {
        await handleSetAuthToken()

        return await TestorchAxiosConfig.post<any>(postStartTestPlanRoute, {
          fileName: parsedInput.fileName,
          workerNodes: parsedInput.workerNodes,
        })
      }

      return await handleServerSideApiResponse({
        request,
        successMessage: "Test plan started successfully!",
        errorMessage: "Failed to start test plan.",
      })
    }
  )
