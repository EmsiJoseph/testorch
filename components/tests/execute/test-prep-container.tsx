"use client"

import { TStartTestPlanFormValues, TStartTestPlanFormValuesV2 } from "@/schemas/test-plan"
import { useSignalEffect } from "@preact/signals-react"
import { CloudIcon, Settings2Icon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"

import { startTestPlan } from "@/app/actions/start-test-plan"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import socket from "@/lib/clients/socket-io-client"
import { handleClientSideApiResponse } from "@/lib/handlers/handle-client-side-api-response"
import handleExecuteAsync from "@/lib/handlers/handle-execute-async"
import useSocketsStore from "@/lib/stores/use-sockets"
import { useTestPlansStore } from "@/lib/stores/use-tests"
import { formatFriendlyDate } from "@/lib/utils/date-utils"
import { startTestPlanv2 } from "@/app/actions/start-test-plan v2"
import { useProjectsStore } from "@/lib/stores/use-projects"

export default function TestPrepContainer() {
  const { selectedTestPlan } = useTestPlansStore()
  const {selectedProject} = useProjectsStore()
  const { executeAsync, isExecuting } = useAction(startTestPlanv2)
  const { progress, workers, setProgress, addWorker, lastUpdated } =
    useSocketsStore()

  useSignalEffect(() => {
    const executeTestPlan = async () => {
      console.log("selectedTestPlan", selectedTestPlan)
      console.log("selectedProject", selectedProject)
      if (!selectedTestPlan) {
        handleClientSideApiResponse({
          success: false,
          message: "File not found",
        })
      }
      try {
        await handleExecuteAsync<TStartTestPlanFormValuesV2>(executeAsync, {
          testPlanName: selectedTestPlan?.name ?? "",
          workerNodes: 1,
          projectName: selectedProject?.name ?? "",
        })
      } catch (error) {
        handleClientSideApiResponse({
          success: false,
          message: "Error launching test",
        })
      }
    }

    executeTestPlan()
    // Listen for progress updates
    socket.on("progressUpdate", (progress) => {
      console.log("Progress Update: ", progress)
      setProgress(progress)
    })

    // Listen for pod status updates
    socket.on("podStatusUpdate", (status) => {
      console.log("Pod Status Update: ", status)
      addWorker(status)
    })

    // Clean up the event listeners on component unmount
    return () => {
      socket.off("progressUpdate")
      socket.off("podStatusUpdate")
    }
  })

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto mb-6 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Preparing to Run Test</h1>
          <p className="text-sm text-red-400">
            Please stay on this page to ensure the process is not interrupted.
          </p>
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
            {progress.length > 0 && (
              <p
                className="text-sm text-muted-foreground"
                suppressHydrationWarning
              >
                Updated @ {formatFriendlyDate(lastUpdated)} - Progress: {progress}
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
                  const icon =
                    worker.type === "controller" ? (
                      <CloudIcon />
                    ) : (
                      <Settings2Icon />
                    )
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
