import Link from "next/link"

import { TestorchLogo } from "@/components/common/testorch-logo"

import { CreateOrganizationForm } from "./create-organization-form"

export default async function Create() {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <TestorchLogo className="mr-2 size-8" />
          <span className="font-mono font-medium">Testorch</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <div className="space-y-1">
              <p className="text-lg">
                Testorch is a load test framework for testing the scalability and
                performance your applications.
              </p>
              <p className="text-lg">
                It features test plan execution, project management, and many more
              </p>
            </div>
            <footer className="text-sm text-muted-foreground">
              — Built by Ample Tech
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create a Team
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your team name.
            </p>
          </div>
          <CreateOrganizationForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
