"use client"

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import UnderConstruction from "@/components/common/under-construction";

// Define the interfaces for the props of each component
interface NameProjectStepProps {
    projectName: string;
    setProjectName: (name: string) => void;
    nextStep: () => void;
}

interface FinishSetupStepProps {
    projectName: string;
}

interface ProgressIndicatorProps {
    currentStep: number;
}

// Step 1: Name Your Project
// Step 1: Name Your Project
const NameProjectStep: React.FC<NameProjectStepProps> = ({projectName, setProjectName, nextStep}) => {
    return (
        <div className="text-center">
            <h2 className="text-xl font-bold mb-16">Name your project</h2>

            {/* Label and Input Container */}
            <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                    <label htmlFor="projectName" className="font-semibold text-foreground mr-4">
                        Project name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Add a name"
                        className="border border-gray-300 bg-transparent rounded-md px-4 py-2 w-64 focus:outline-none focus:border-foreground"
                    />
                </div>
                <p className="text-gray-500 mb-4">
                    After creating a project, you can add test plans later.
                </p>
                <Button
                    onClick={nextStep}
                    disabled={!projectName}
                >
                    Create team
                </Button>
            </div>
        </div>
    );
};

// Step 2: Finish Setup
const FinishSetupStep: React.FC<FinishSetupStepProps> = ({projectName}) => {
    return (
        <UnderConstruction/>
    );
};

// Progress Indicator Component
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({currentStep}) => {
    return (
        <div className="flex justify-center mb-16">
            <div className="flex space-x-20">
                {/* Step 1 */}
                <div className="flex items-center space-x-2">
                    <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                            currentStep >= 1 ? "border-foreground text-foreground" : "border-gray-500 text-gray-500"
                        }`}
                    >
                        1
                    </div>
                    <span className={currentStep >= 1 ? "text-foreground" : "text-gray-500"}>
                        Name your project
                    </span>
                </div>

                {/* Step 2 */}
                <div className="flex items-center space-x-2">
                    <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                            currentStep >= 2 ? "border-foreground text-foreground" : "border-gray-500 text-gray-500"
                        }`}
                    >
                        2
                    </div>
                    <span className={currentStep >= 2 ? "text-foreground" : "text-gray-500"}>
                        Finish setup
                    </span>
                </div>
            </div>
        </div>
    );
};

// Main Create Project Container
export default function CreateProjectContainer() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [projectName, setProjectName] = useState<string>("");

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    return (

        <div className="container mx-auto p-6">
            {/* Progress Indicator */}
            <ProgressIndicator currentStep={currentStep}/>

            {/* Step Components */}
            {currentStep === 1 && (
                <NameProjectStep
                    projectName={projectName}
                    setProjectName={setProjectName}
                    nextStep={nextStep}
                />
            )}

            {currentStep === 2 && <FinishSetupStep projectName={projectName}/>}
        </div>
    );
}
