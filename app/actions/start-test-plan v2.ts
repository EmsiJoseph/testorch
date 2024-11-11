"use server"

import { StartTestPlanSchemaV2 } from "@/schemas/test-plan"
import { AxiosResponse } from "axios"
import { flattenValidationErrors } from "next-safe-action"

import { TestorchAxiosConfig } from "@/config/backend-axios-config"
import {
  postStartTestPlanRouteV2
} from "@/config/endpoints/test-plan-management-routes"
import { handleServerSideApiResponse } from "@/lib/handlers/handle-server-side-api-response"
import { handleSetAuthToken } from "@/lib/handlers/handle-set-auth-token"
import { actionClient } from "@/lib/safe-action"

export const startTestPlanv2 = actionClient
  .schema(StartTestPlanSchemaV2, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput,
    }: {
      parsedInput: { testPlanName: string; workerNodes: number, projectName: string }
    }) => {
      const request = async (): Promise<AxiosResponse<any>> => {
        await handleSetAuthToken()

        return await TestorchAxiosConfig.post<any>(postStartTestPlanRouteV2, {
          testPlanName: parsedInput.testPlanName,
          workerNodes: parsedInput.workerNodes,
          projectName: parsedInput.projectName
        })
      }

      return await handleServerSideApiResponse({
        request,
        successMessage: "Test plan started successfully!",
        errorMessage: "Failed to start test plan.",
      })
    }
  )
