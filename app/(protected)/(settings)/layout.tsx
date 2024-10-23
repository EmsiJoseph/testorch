import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

import { appClient } from "@/lib/auth0"
import { getRole } from "@/lib/roles"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SidebarNav } from "@/components/nav/sidebar-nav"

const sidebarNavItems = [
  {
    title: "General Settings",
    href: "/team/general",
  },
  {
    title: "Members",
    href: "/team/members",
  },
  {
    title: "SSO",
    href: "/team/sso",
  },
  {
    title: "Security Policies",
    href: "/team/security-policies",
  },
]

interface AccountLayoutProps {
  children: React.ReactNode
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const session = await appClient.getSession()

  // if the user is not authenticated, redirect to login
  if (!session?.user) {
    redirect("/api/auth/login")
  }

  if (getRole(session.user) !== "admin") {
    return (
      <div className="flex items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Unauthorized</CardTitle>
            <CardDescription className="space-y-1.5">
              <p>
                You’re currently logged in with the role of{" "}
                <span className="font-semibold">{getRole(session.user)}</span>.
              </p>
              <p>
                Log in as Team member with the{" "}
                <span className="font-semibold">admin</span> role to manage your
                Team&apos;s settings.
              </p>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/projects" className="w-full">
              <Button className="w-full">
                <ArrowLeftIcon className="mr-2 h-4 w-4" /> Go Back to Projects
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div className="flex min-h-full flex-col space-y-8 lg:flex-row lg:space-x-4 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="rounded-2xl border border-border bg-field p-2 shadow-sm lg:w-4/5">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </div>
    </div>
  )
}
