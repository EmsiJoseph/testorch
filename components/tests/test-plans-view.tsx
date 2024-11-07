"use client"

import TestListView from "@/components/tests/test-plan-list-view";
import {useUrlParams} from "@/lib/use-url-params";
import TestGridView from "@/components/tests/test-plan-grid-view";
import { ITestPlan } from "@/lib/interfaces/test-plan.interfaces";

export default function TestPlansView({tests}: { tests: ITestPlan[] }) {
    const {view} = useUrlParams();
    return (
        <>
            {view === "list" ? <TestListView tests={tests}/> : <TestGridView tests={tests}/>}
        </>
    )
}