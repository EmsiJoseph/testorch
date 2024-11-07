import React, {ReactNode} from "react";
import TestPlansView from "@/components/tests/test-plans-view";
import { ITestPlan } from "@/lib/interfaces/test-plan.interfaces";

type TestPlanGroupProps = {
    tests: ITestPlan[];
};

const TestPlanGroup: React.FC<TestPlanGroupProps> = ({ tests }) => {
    // Group the tests by project
    const groupedTests = tests.reduce((acc, test) => {
        (acc[test.project] = acc[test.project] || []).push(test);
        return acc;
    }, {} as Record<string, ITestPlan[]>);

    return (
        <div className="space-y-8">
            {Object.entries(groupedTests).map(([project, tests]) => (
                <div key={project}>
                    {/* Project Name */}
                    <div className="text-sm font-semibold mb-4 text-foreground">{project}</div>
                   <TestPlansView tests={tests} />
                </div>
            ))}
        </div>
    );
};

export default TestPlanGroup;
