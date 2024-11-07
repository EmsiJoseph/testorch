
import { TestorchLogo } from "@/components/common/testorch-logo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { SubmitButton } from "@/components/common/submit-button"
import { appClient } from "@/lib/auth0/auth0"
import { SignUpForm } from "./signup-form"
import { WelcomeBackCard } from "./welcome-back-card"

export default async function Home() {
  const session = await appClient.getSession()

  return (
    <div className="container relative sm:grid h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {session ? (
        <a
          href="/api/auth/logout"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          <SubmitButton>Logout</SubmitButton>
        </a>
      ) : (
        <div
          className="absolute right-4 top-4 md:right-8 md:top-8"
        ><span className="text-sm">Already joined?</span> <a
          className="text-sm underline"
          href="/api/auth/login"
        >
          <SubmitButton className="ml-4">Log in</SubmitButton>
        </a>
        </div>
      )}

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-black" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <TestorchLogo/>
          <span className="ml-2 font-semibold">Testorch</span>
        </div>
        <div className="relative z-20 m-auto max-w-sm text-center">
          <blockquote className="space-y-2">
            <div className="space-y-8">
              <p className="text-lg font-medium">
                Testorch is a load test framework for testing the scalability and
                performance your applications.
              </p>
              <p className="text-lg">
                It features test plan execution, project management, and many more
              </p>
            </div>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex h-screen">
        {session ? <WelcomeBackCard /> : <SignUpForm />}
      </div>
    </div>
  )
}
