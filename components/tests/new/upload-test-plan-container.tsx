"use client"

import { TUploadTestPlanFormValues } from "@/schemas/test-plan"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

import { uploadTestPlan } from "@/app/actions/upload-test-plan"
import { Code } from "@/components/common/code"
import DropZone from "@/components/tests/new/dropzone"
import { Spinner } from "@/components/ui/spinner"
import handleExecuteAsync from "@/lib/handlers/handle-execute-async"

const UploadTestPlanContainer = () => {
  const [file, setFile] = useState<File | null>(null)
  const { executeAsync, isExecuting } = useAction(uploadTestPlan)

  const router = useRouter()

  const handleUpload = async () => {
    if (!file) return
    const fileName = file.name
    const fileBase64 = await convertFileToBase64(file)
    const res = await handleExecuteAsync<TUploadTestPlanFormValues>(
      executeAsync,
      { file: fileBase64, fileName: fileName }
    )
    if (res?.data?.success) {
      setFile(null)
      router.push(
        `/tests/new/jmeter/${encodeURIComponent(JSON.stringify(res.data.data))}`
      )
    }
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">
          Let&apos;s test something new.
        </h1>
        <p className="text-gray-500">
          To execute a new Test, upload a working Test Plan in <Code>JMX</Code>{" "}
          or <Code>XML</Code> format.
        </p>
      </div>

      {/* Drop Zone Section */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-lg p-6 ">
          {isExecuting ? (
            <div className="flex h-64 items-center justify-center">
              <Spinner size="large">Uploading...</Spinner>
            </div>
          ) : (
            <DropZone
              file={file}
              setFile={setFile}
              nextStep={handleUpload}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadTestPlanContainer
