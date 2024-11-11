"use client"

import { useRouter } from "nextjs-toploader/app"

import { ITestPlan } from "@/lib/interfaces/test-plan.interfaces"
import { useProjectsStore } from "@/lib/stores/use-projects"
import { useTestPlansStore } from "@/lib/stores/use-tests"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import TableActions from "./table-actions"

export default function TestsTable({
  tests,
}: {
  tests: ITestPlan[] | undefined
}) {
  const { selectTestPlan } = useTestPlansStore()
  const { selectedProject } = useProjectsStore()
  const router = useRouter()
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Author</TableHead>
            {/* <TableHead>Host</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Users</TableHead> */}
            <TableHead className="w-[1%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests && tests.length > 0 ? (
            tests.map((test) => (
              <TableRow key={test.name}>
                <TableCell className="font-medium">{test.name}</TableCell>
                <TableCell>{test.type}</TableCell>
                <TableCell>{test.createdByName}</TableCell>
                {/* <TableCell>{test.host}</TableCell>
                <TableCell>{test.region}</TableCell>
                <TableCell>{test.users}</TableCell> */}
                <TableCell>
                  <TableActions
                    onLaunch={() => {
                      selectTestPlan(test)
                      router.push(
                        `/projects/${selectedProject?.name}/execute/${test.name}`
                      )
                    }}
                    onEdit={() => console.log("Edit", test.name)}
                    onDelete={() => console.log("Delete", test.name)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-[400px]" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
