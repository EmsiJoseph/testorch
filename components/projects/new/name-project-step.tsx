"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { NameProjectStepProps } from "@/lib/interfaces/project.interfaces";

// Step 1: Name Your Project
const NameProjectStep: React.FC<NameProjectStepProps> = ({ projectName, setProjectName, nextStep }) => {
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

export default NameProjectStep;
