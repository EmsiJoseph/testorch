import {onboardingClient} from "@/lib/auth0";
import {redirect} from "next/navigation";

export default async function VerifyLayout({
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
  // user must verify their e-mail first to create your account
  if (user.email_verified) {
    redirect("/auth/create-team")
  }

  return <main className="flex min-h-screen items-center">{children}</main>
}
