"use client"

import SetupTestContainer from "@/components/tests/new/setup/setup-test-container"
import { ITestData } from "@/lib/interfaces/test-plan.interfaces"

export default function Page({ params }: { params: { slug: string } }) {

    const parsedParams = JSON.parse(decodeURIComponent(params.slug))

  return <SetupTestContainer params={parsedParams} />
}
