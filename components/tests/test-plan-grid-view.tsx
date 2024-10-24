import React from "react";
import TestCardGrid from "@/components/tests/test-plan-card-grid";
import {ITestPlan} from "@/types/interfaces";

export type TestViewProps = {
    tests: ITestPlan[]
};

const TestGridView: React.FC<TestViewProps> = ({ tests }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test, index) => (
            <TestCardGrid
                key={index}
                name={test.name}
                status={test.status}
                completedOn={test.completedOn}
                executedOn={test.executedOn}
                duration={test.duration}
                testType={test.testType}
                project={test.project}
            />
        ))}
    </div>
);

export default TestGridView;
