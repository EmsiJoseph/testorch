import { redirect } from "next/navigation"
import { UserProvider } from "@auth0/nextjs-auth0/client"

import { onboardingClient } from "@/lib/auth0"

export default async function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await onboardingClient.getSession()

  if (!session) {
    redirect("/auth/signup")
  }

  // fetch the latest user data to ensure that the `email_verified` is not stale
  const user = await fetch(
    new URL("/userinfo", `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`),
    {
      headers: {
        Authorization: `Bearer ${(await onboardingClient.getAccessToken()).accessToken}`,
      },
    }
  ).then((res) => res.json())

  console.log("verified: ", user.email_verified)
  // user must verify their e-mail first to create your account
  if (!user.email_verified) {
    redirect("/auth/verify")
  }

  return (
    <UserProvider profileUrl="/auth/me">
      <main className="min-h-screen">{children}</main>
    </UserProvider>
  )
}
