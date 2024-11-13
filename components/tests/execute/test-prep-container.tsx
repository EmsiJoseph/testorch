"use client"

import { useEffect, useRef } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useSignalEffect } from "@preact/signals-react"
import { Bot, CloudIcon, Settings2Icon } from "lucide-react"

import socket from "@/lib/clients/socket-io"
import { handleClientSideApiResponse } from "@/lib/handlers/handle-client-side-api-response"
import { StepProps } from "@/lib/interfaces/project.interfaces"
import { useProjectsStore } from "@/lib/stores/use-projects"
import useSocketsStore from "@/lib/stores/use-sockets"
import { useTestPlansStore } from "@/lib/stores/use-tests"
import { formatFriendlyDate } from "@/lib/utils/date-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TestPrepContainer: React.FC<StepProps> = ({ nextStep }) => {
  const { selectedTestPlan } = useTestPlansStore()
  const { selectedProject } = useProjectsStore()
  const { buildStatus, workers, setBuildStatus, addWorkers, lastUpdated } =
    useSocketsStore()

  const { user } = useUser()
  const hasExecutedRef = useRef(false)

  useEffect(() => {
    if (hasExecutedRef.current) return
    hasExecutedRef.current = true

    const executeTestPlan = () => {
      if (!selectedTestPlan) {
        handleClientSideApiResponse({
          success: false,
          message: "File not found",
        })
        return
      }
      socket.emit("startTestV3", {
        testPlanName: selectedTestPlan?.name ?? "",
        email: user?.email ?? "",
        auth0_org_id: user?.org_id ?? "",
        workerNodes: 1,
        projectName: selectedProject?.name ?? "",
        protocol: "http",
        host: "localhost",
        basePath: "/",
        threadCount: 1,
        startUpTime: 1,
        holdLoadTime: 1,
        shutdownTime: 1,
        targetThroughputPerMin: 1,
      })
    }

    executeTestPlan()
  }, [])

  useSignalEffect(() => {
    // Listen for build status updates
    socket.on("buildStatus", (status) => {
      console.log("Build Status Update: ", status)
      setBuildStatus(status.message)
    })

    // Listen for pod status updates
    socket.on("podsStatus", (status) => {
      console.log("Pod Status Update: ", status)
      addWorkers(status) // Ensure addWorkers sets the entire array
    })

    // Clean up the event listeners on component unmount
    return () => {
      socket.off("buildStatus")
      socket.off("podsStatus")
    }
  })

  useSignalEffect(() => {
    if (
      workers.some(
        (worker) =>
          worker.type.includes("worker") && worker.status === "Running"
      )
    ) {
      setTimeout(() => {
        nextStep
      }, 2000)
    }
  })

  console.log("Worker: ", workers)
  return (
    <>
      <div className="mx-auto mb-6 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Preparing to Run Test</h1>
          <p className="text-sm text-red-400">
            Please stay on this page to ensure the process is not interrupted.
          </p>
          <p className="text-muted-foreground"></p>
          <p className="text-muted-foreground">
            Testorch is provisioning the workers required to run your test. This
            should take between 20 and 40 seconds. Should it fail the test will
            be cancelled after 10 minutes.
          </p>
        </div>

        {/* Status Card */}
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 ">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Preparing Workers...
            </CardTitle>
            {buildStatus.length > 0 && (
              <p
                className="text-sm text-muted-foreground"
                suppressHydrationWarning
              >
                Updated @ {formatFriendlyDate(lastUpdated)} - Status:{" "}
                {buildStatus}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We are launching the workers in kubernetes, and then installing
              our requirements. This process typically takes between 1 and 2
              minutes. <span className="font-medium">Note:</span> If the
              instances fails to launch or install, the test will automatically
              abandon after 10-20 minutes. You can simply launch another test to
              retry, from the main Test page. This can occur if an error happens
              on our end.
            </p>

            {/* Workers Table */}
            {workers.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>POD ID</TableHead>
                    <TableHead>ROLE</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workers.map((worker) => {
                    let icon
                    if (worker.type === "controller") {
                      icon = <CloudIcon />
                    } else if (worker.type === "agent") {
                      icon = <Bot />
                    } else {
                      icon = <Settings2Icon />
                    }
                    return (
                      <TableRow key={worker.id}>
                        <TableCell className="font-mono">{worker.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {icon}
                            Testorch {worker.type}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                            {worker.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default TestPrepContainer
