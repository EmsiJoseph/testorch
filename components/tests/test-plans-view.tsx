"use client"

import TestListView from "@/components/tests/test-plan-list-view";
import {getUrlParams} from "@/lib/get-url-params";
import TestGridView from "@/components/tests/test-plan-grid-view";
import {ITestPlan} from "@/types/interfaces";

export default function TestPlansView({tests}: { tests: ITestPlan[] }) {
    const {view} = getUrlParams();
    return (
        <>
            {view === "list" ? <TestListView tests={tests}/> : <TestGridView tests={tests}/>}
        </>
    )
}