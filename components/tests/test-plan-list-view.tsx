import React from "react";
import TestCardList from "@/components/tests/test-plan-card-list";
import {TestViewProps} from "@/components/tests/test-plan-grid-view";


const TestListView: React.FC<TestViewProps> = ({ tests }) => (
    <div className="space-y-4">
        {tests.map((test, index) => (
            <TestCardList
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

export default TestListView;
