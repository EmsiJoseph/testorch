"use client"

import React from "react";
import { ProgressIndicatorProps } from "@/lib/interfaces/project.interfaces";

// Progress Indicator Component
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
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

export default ProgressIndicator;
