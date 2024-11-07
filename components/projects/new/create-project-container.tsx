"use client"

import { useState } from "react";
import ProgressIndicator from "./create-project-step-progress";
import FinishSetupStep from "./finish-setup-step";
import NameProjectStep from "./name-project-step";

// Main Create Project Container
export default function CreateProjectContainer() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [projectName, setProjectName] = useState<string>("");

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    // const { executeAsync, isExecuting } = useAction(addTest)

    // const { user } = useUser()
  
    // const form = useForm<TAddTestFormValues>({
    //   resolver: zodResolver(AddTestSchema),
    //   defaultValues: {
    //     userEmail: user?.email || "",
    //     testName: "",
    //   },
    //   mode: "onChange",
    // })
  
    // const onSubmit = async () => {
    //   const formValues = form.getValues()
    //   const res = await handleExecuteAsync<TAddTestFormValues>(
    //     executeAsync,
    //     formValues
    //   )
  
    //   if (res?.data?.success) {
    //     form.reset()
    //     router.push(``)
    //   }
    // }

    return (
        <div className="container mx-auto p-6">
            {/* Progress Indicator */}
            <ProgressIndicator currentStep={currentStep} />

            {/* Step Components */}
            {currentStep === 1 && (
                <NameProjectStep
                    projectName={projectName}
                    setProjectName={setProjectName}
                    nextStep={nextStep}
                />
            )}

            {currentStep === 2 && <FinishSetupStep projectName={projectName} />}
        </div>
    );
}
