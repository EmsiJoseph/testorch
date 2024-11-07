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

export const createProject = actionClient
  .schema(CreateProjectSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput,
    }: {
      parsedInput: { file: string; fileName: string }
    }) => {
      const request = async (): Promise<
        AxiosResponse<IUploadTestPlanResponse>
      > => {
        await handleSetAuthToken()

        return await TestorchAxiosConfig.post<IUploadTestPlanResponse>(
          postUploadTestPlanRoute,
          { file: parsedInput.file, fileName: parsedInput.fileName }
        )
      }

      return await handleServerSideApiResponse({
        request,
        successMessage: "Test plan uploaded successfully!",
        errorMessage: "Failed to upload test plan.",
      })
    }
  )
