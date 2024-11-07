import { redirect } from "next/navigation"
import { getProjects } from "@/data-access/get-projects"

import { appClient } from "@/lib/auth0/auth0"
import ProjectsContainer from "@/components/projects/project-container"

export default async function Projects() {
  const session = await appClient.getSession()

  // if the user is not authenticated, redirect to login
  if (!session?.user) {
    redirect("/api/auth/login")
  }

  const res = await getProjects(session.user.org_id)

  return <ProjectsContainer projects={res ? res.data : []} />
}
