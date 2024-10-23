import React from "react"
import {Badge} from "@/components/ui/badge"
import {Circle} from "lucide-react"

type StatusType = "Passed" | "Failed" | "In Progress"

interface StatusBadgeProps {
    status: StatusType
}

const getStatusColor = (status: StatusType) => {
    switch (status) {
        case "Passed":
            return "bg-green-100 dark:bg-green-950 text-green-500 hover:bg-green-100 hover:dark:bg-green-950"
        case "Failed":
            return "bg-red-100 dark:bg-red-950 text-red-500 hover:bg-red-100 hover:dark:bg-red-950"
        case "In Progress":
            return "bg-yellow-100 dark:bg-yellow-950 text-yellow-500 hover:bg-yellow-100 hover:dark:bg-yellow-950"
        default:
            return "bg-gray-100 dark:bg-gray-950 text-gray-500 hover:bg-gray-100 hover:dark:bg-gray-950"
    }
}

const StatusIcon = ({status}: { status: StatusType }) => {
    switch (status) {
        case "Passed":
            return <Circle fill="currentColor" className="mr-1.5 h-2 w-2"/>
        case "Failed":
            return <Circle fill="currentColor" className="mr-1.5 h-2 w-2"/>
        case "In Progress":
            return <Circle fill="currentColor" className="mr-1.5 h-2 w-2"/>
    }
}

export function StatusBadge({status}: StatusBadgeProps) {
    return (
        <Badge className={`${getStatusColor(status)}`}>
            <StatusIcon status={status}/>
            {status}
        </Badge>
    )
}