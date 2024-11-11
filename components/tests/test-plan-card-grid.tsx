import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Activity, Calendar, Clock} from "lucide-react"
import {StatusBadge} from "@/components/common/status-badge";
import { ITestPlan } from "@/lib/interfaces/test-plan.interfaces";

export default function TestPlanCard({
                                         name,
                                         status,
                                         completedOn,
                                         executedOn,
                                         duration,
                                         testType,
                                     }: ITestPlan) {

    return (
        <Card className="w-full max-w-md bg-field dark:bg-neutral-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{name}</CardTitle>
                <StatusBadge status={status}/>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-2 h-4 w-4"/>
                        Completed on: {completedOn}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-2 h-4 w-4"/>
                        Executed on: {executedOn}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-2 h-4 w-4"/>
                        Duration: {duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Activity className="mr-2 h-4 w-4"/>
                        Test Type: {testType}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}