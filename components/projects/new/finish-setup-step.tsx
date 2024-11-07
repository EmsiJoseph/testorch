"use client"

import React from "react";
import UnderConstruction from "@/components/common/under-construction";
import { FinishSetupStepProps } from "@/lib/interfaces/project.interfaces";

// Step 2: Finish Setup
const FinishSetupStep: React.FC<FinishSetupStepProps> = ({ projectName }) => {
    return (
        <UnderConstruction />
    );
};

export default FinishSetupStep;
