import { UserProvider } from "@auth0/nextjs-auth0/client"
import { SettingsIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import AddNewDropdownBtn from "@/components/common/add-new-dropdown-btn"
import DynamicBreadcrumbsComponent from "@/components/common/dynamic-breadcrumbs"
import { ModeToggle } from "@/components/common/mode-toggle"
import { TestorchLogo } from "@/components/common/testorch-logo"
import { TeamSwitcher } from "@/components/nav/team-switcher"
import { UserNav } from "@/components/nav/user-nav"
import { Button } from "@/components/ui/button"
import { appClient, managementClient } from "@/lib/auth0/auth0"

const navigationItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/projects" },
  { name: "Tests", href: "/tests" },
]

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await appClient.getSession()

  let accessToken
  try {
    const { accessToken: token } = await appClient.getAccessToken()
    accessToken = token
  } catch (error) {
    console.error("Failed to get access token:", error)
    accessToken = null
  }

  if (!accessToken) {
    redirect("/api/auth/login")
  }
  
  // if the user is not authenticated, redirect to login
  if (!session?.user) {
    redirect("/api/auth/login")
  }

  const { data: orgs } = session ? await managementClient.users.getUserOrganizations({
    id: session.user.sub,
  }) : { data: [] }

  // if the user does not belong to any organizations, redirect to onboarding
  if (!orgs.length) {
    redirect("/onboarding/create")
  }

  return (
    <UserProvider>
      {/* Top navigation bar */}
      <nav className="border-b border-muted/100 bg-field dark:bg-neutral-950">
        <div className="mx-auto flex w-full items-center justify-between px-2 py-4 sm:px-8">
          <div className="flex items-center space-x-6">
            {/* Team switcher */}
            <TeamSwitcher
              organizations={orgs.map((o) => ({
                id: o.id,
                slug: o.name,
                displayName: o.display_name!,
                logoUrl: o.branding?.logo_url,
              }))}
              currentOrgId={session?.user.org_id || orgs[0].id}
            />

            {/* Dynamically render the navigation links */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <AddNewDropdownBtn />
          </div>

          <div className="flex flex-row gap-x-4">
            <Button variant="ghost" asChild className="px-2 py-2">
              <Link href="/team/general">
                <SettingsIcon className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <UserNav />
          </div>
        </div>
      </nav>
      <nav className="border-b border-muted/100 bg-field dark:bg-neutral-950">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-10">
          <DynamicBreadcrumbsComponent />
        </div>
      </nav>

      {/* Main content layout */}
      <main
        className="max-w-9xl grid min-h-[calc(100svh-164px)] p-6 dark:bg-field"
        suppressHydrationWarning
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-full border-t border-muted/100 bg-field px-2 py-6 dark:bg-neutral-950 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <TestorchLogo className="h-6 w-6" />

            <div className="font-mono font-semibold">
              <Link href="/">Testorch</Link>
            </div>

            <div>
              <Button variant="link" asChild>
                <Link href="">Upgrade</Link>
              </Button>

              <Button variant="link" asChild>
                <Link href="">Help</Link>
              </Button>

              <Button variant="link" asChild>
                <Link href="" target="_blank">
                  X
                </Link>
              </Button>
            </div>
          </div>

          <div className="items-center gap-x-2">
            <ModeToggle />
          </div>
        </div>
      </footer>
    </UserProvider>
  )
}
