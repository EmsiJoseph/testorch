"use client"

import { Play } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useSocketsStore from "@/lib/stores/use-sockets"
import { useTestPlansStore } from "@/lib/stores/use-tests"

// Header Component
function Header() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Launching a Load Test</h1>
      <p className="text-muted-foreground">
        This test will run as long as you specify below, and generate traffic
        for 200 users. Please be aware this can cause downtime on your
        applications!
      </p>
    </div>
  )
}

// Checklist Component
function Checklist() {
  const checklistItems = [
    "Do you understand this could crash your webserver if it is overloaded?",
    "Do you understand this will incur a bill at your cloud provider (shown to the right)?",
    "Should the test fail for any reason, you must delete the droplets to avoid paying for them.",
    "Is this the test url correct and do you have permission to run this test against this url?",
  ]

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium uppercase text-primary">
        CHECKLIST
      </div>
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Are you ready to launch your load test?
        </h2>
        <ul className="space-y-3">
          {checklistItems.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="min-w-3">•</div>
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Duration Selector Component
function DurationSelector() {
  return (
    <div className="space-y-2">
      <label className="text-sm">Run duration:</label>
      <Select defaultValue="5">
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 minutes [recommended]</SelectItem>
          <SelectItem value="10">10 minutes</SelectItem>
          <SelectItem value="15">15 minutes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

// Test Details Component
function TestDetails() {
  const { selectedTestPlan } = useTestPlansStore()
  const details = [
    { label: "TEST DESTINATION", value: "https://example.com" },
    { label: "NUMBER OF USERS", value: "200" },
    { label: "NUMBER OF WORKERS", value: "1" },
    { label: "AUTHOR", value: selectedTestPlan?.createdByName },
    { label: "TYPE", value: selectedTestPlan?.type },
    { label: "CREATED AT", value: selectedTestPlan?.created_at },
  ]

  return (
    <div className="space-y-6">
      {details.map((detail, index) => (
        <div key={index} className="space-y-1">
          <div className="text-sm text-muted-foreground">{detail.label}</div>
          <div className="text-lg font-semibold">{detail.value}</div>
        </div>
      ))}
    </div>
  )
}

// Main Component
export default function TestExecutionContainer() {
  const router = useRouter()
  const {clearAll } =
  useSocketsStore()

  const handleLaunch = async () => {
    clearAll()
    router.push(`/prepare-test`)
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <Header />
          <Card className="dark:bg bg-field">
            <CardContent className="space-y-8 pt-6">
              <Checklist />
              <DurationSelector />
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    router.back()
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button className="gap-2" onClick={handleLaunch}>
                  <Play className="h-4 w-4" />
                  Launch Test Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="dark:bg bg-field">
          <CardHeader>
            <CardTitle>Test Details</CardTitle>
          </CardHeader>
          <CardContent>
            <TestDetails />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
