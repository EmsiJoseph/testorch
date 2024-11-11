import { getTestPlans } from "@/data-access/get-test-plans"

import SpecificProjectContainer from "@/components/projects/specific/specific-project-container"

export default async function Page({ params }: { params: { name: string } }) {
  const res = await getTestPlans(params.name)
  return (
    <SpecificProjectContainer
      projectName={params.name}
      tests={res ? res.data : []}
      error={res ? res.message : null}
    />
  )
}
