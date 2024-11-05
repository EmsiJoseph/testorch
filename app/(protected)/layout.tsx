import Link from "next/link"
import {redirect} from "next/navigation"
import {UserProvider} from "@auth0/nextjs-auth0/client"
import {SettingsIcon} from "lucide-react"

import {appClient, managementClient} from "@/lib/auth0"
import {Button} from "@/components/ui/button"
import {TestorchLogo} from "@/components/common/testorch-logo"
import {ModeToggle} from "@/components/common/mode-toggle"
import {TeamSwitcher} from "@/components/nav/team-switcher"
import {UserNav} from "@/components/nav/user-nav"
import AddNewDropdownBtn from "@/components/common/add-new-dropdown-btn";

const navigationItems = [
    {name: "Dashboard", href: "/dashboard"},
    {name: "Projects", href: "/projects"},
    {name: "Tests", href: "/tests"},
]

export default async function DashboardLayout({
                                                  children,
                                              }: Readonly<{
    children: React.ReactNode
}>) {
    const session = await appClient.getSession()

    // if the user is not authenticated, redirect to login
    if (!session?.user) {
        redirect("/api/auth/login")
    }

    const {data: orgs} = await managementClient.users.getUserOrganizations({
        id: session.user.sub,
    })

    // if the user does not belong to any organizations, redirect to onboarding
    if (!orgs.length) {
        redirect("/onboarding/create")
    }

    return (
        <UserProvider>
            {/* Top navigation bar */}
            <nav className="bg-field dark:bg-neutral-950 border-b border-muted/100">
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
                            currentOrgId={session.user.org_id || orgs[0].id}
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
                        <AddNewDropdownBtn/>
                    </div>

                    <div className="flex flex-row gap-x-4">
                        <Button variant="ghost" asChild className="px-2 py-2">
                            <Link href="/team/general">
                                <SettingsIcon className="h-[1.2rem] w-[1.2rem]"/>
                            </Link>
                        </Button>
                        <UserNav/>
                    </div>
                </div>
            </nav>

            {/* Main content layout */}
            <main className="grid min-h-[calc(100svh-164px)] dark:bg-field max-w-9xl p-6">
                {children}
            </main>

            {/* Footer */}
            <footer
                className="bg-field mx-auto dark:bg-neutral-950 max-w-full border-t border-muted/100 px-2 py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                        <TestorchLogo className="h-6 w-6"/>

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
                        <ModeToggle/>
                    </div>
                </div>
            </footer>
        </UserProvider>
    )
}
