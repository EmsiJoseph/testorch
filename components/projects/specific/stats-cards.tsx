"use client"

import { Card } from "@/components/ui/card"
import { useTestPlansStore } from "@/lib/stores/use-tests"

export default function StatsCards() {
  const {testPlans} = useTestPlansStore()
  const stats = [
    { label: "TOTAL TESTS", value: testPlans.length.toString() },
    { label: "TEST SCRIPTS ALLOWED", value: "20" },
    { label: "ACTIVE RUNS", value: "0" },
    { label: "CREDITS REMAINING", value: "20" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
