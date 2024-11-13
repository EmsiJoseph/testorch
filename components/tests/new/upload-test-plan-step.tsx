import React, { useEffect, useState } from "react"
import { useSignalEffect } from "@preact/signals-react"
import { useFormContext } from "react-hook-form"

import { StepProps } from "@/lib/interfaces/project.interfaces"
import { Code } from "@/components/common/code"
import DropZone from "@/components/tests/new/dropzone"

const UploadTestPlanStep: React.FC<StepProps> = ({
  prevStep,
  nextStep,
}) => {
  const form = useFormContext()

  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    const processFile = async () => {
      if (!file) return
      const fileName = file.name
      const fileBase64 = await convertFileToBase64(file)
      console.log("fileBase64", fileBase64)
      const formattedFileName = fileName.replace(/\.[^/.]+$/, "")
      form.setValue("file", fileBase64)
      form.setValue("fileName", fileName)
      form.setValue("name", formattedFileName)
    }
    processFile()
  }, [file])

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <div className="text-center">
      <div className="mb-5 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Upload your test plan</h2>
        <p className="text-gray-500">
          To execute a new Test, upload a working Test Plan in <Code>JMX</Code>{" "}
          or <Code>XML</Code> format.
        </p>
      </div>

      {/* Label and Input Container */}
      <div className="flex flex-col items-center">
        <div className="mb-4 flex w-full max-w-[500px] items-center">
          <DropZone
            file={file}
            setFile={setFile}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
      </div>
    </div>
  )
}

export default UploadTestPlanStep
