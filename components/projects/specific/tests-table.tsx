"use client"

import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"

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
  
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'created_at', direction: 'asc' })

  const sortedTests = tests ? tests.slice().sort((a, b) => {
    const key = sortConfig.key as keyof ITestPlan
    if (a[key] == null || b[key] == null) {
      return 0;
    }
    if (a[key] < b[key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0
  }) : []

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => requestSort('name')}>Name</TableHead>
            <TableHead onClick={() => requestSort('type')}>Type</TableHead>
            <TableHead onClick={() => requestSort('createdByName')}>Author</TableHead>
            <TableHead onClick={() => requestSort('created_at')}>Added on</TableHead>
            {/* <TableHead>Host</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Users</TableHead> */}
            <TableHead className="w-[1%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTests && sortedTests.length > 0 ? (
            sortedTests.map((test) => (
              <TableRow key={test.name}>
                <TableCell className="font-medium">{test.name}</TableCell>
                <TableCell>{test.type}</TableCell>
                <TableCell>{test.createdByName}</TableCell>
                <TableCell>{test.created_at}</TableCell>
                {/* <TableCell>{test.host}</TableCell>
                <TableCell>{test.region}</TableCell>
                <TableCell>{test.users}</TableCell> */}
                <TableCell>
                  <TableActions
                    onLaunch={() => {
                      selectTestPlan(test)
                      router.push(
                        `/projects/${selectedProject?.name}/${test.name}`
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
