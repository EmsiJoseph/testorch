"use server"

import { StartTestPlanSchemaV2 } from "@/schemas/test-plan"
import { AxiosResponse } from "axios"
import { flattenValidationErrors } from "next-safe-action"

import { TestorchAxiosConfig } from "@/config/backend-axios-config"
import { postStartTestPlanRouteV3 } from "@/config/endpoints/test-plan-management-routes"
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
      parsedInput: {
        testPlanName: string
        email: string
        auth0_org_id: string
        workerNodes: number
        projectName: string
        protocol: string
        host: string
        basePath: string
        threadCount: number
        startUpTime: number
        holdLoadTime: number
        shutdownTime: number
        targetThroughputPerMin: number
      }
    }) => {
      const request = async (): Promise<AxiosResponse<any>> => {
        await handleSetAuthToken()

        return await TestorchAxiosConfig.post<any>(postStartTestPlanRouteV3, {
          testPlanName: parsedInput.testPlanName,
          email: parsedInput.email,
          auth0_org_id: parsedInput.auth0_org_id,
          workerNodes: parsedInput.workerNodes,
          projectName: parsedInput.projectName,
          protocol: parsedInput.protocol,
          host: parsedInput.host,
          basePath: parsedInput.basePath,
          threadCount: parsedInput.threadCount,
          startUpTime: parsedInput.startUpTime,
          holdLoadTime: parsedInput.holdLoadTime,
          shutdownTime: parsedInput.shutdownTime,
          targetThroughputPerMin: parsedInput.targetThroughputPerMin,
        })
      }

      return await handleServerSideApiResponse({
        request,
        successMessage: "Test plan started successfully!",
        errorMessage: "Failed to start test plan.",
      })
    }
  )
