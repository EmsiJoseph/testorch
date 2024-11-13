"use client"

import { useState } from "react"

import PrelaunchContainer from "./test-exec-container"
import TestPrepContainer from "./test-prep-container"
import TestRunningContainer from "./test-running-container"

export default function TestRunStepsContainer() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  console.log(currentStep)

  return (
    <div className="min-h-screen p-8">
      {currentStep === 1 && <PrelaunchContainer nextStep={nextStep} />}
      {currentStep === 2 && <TestPrepContainer nextStep={nextStep} />}
      {/* {currentStep === 3 && <TestRunningContainer nextStep={nextStep}/>} */}
    </div>
  )
}
