import Link from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

import { appClient } from "@/lib/auth0/auth0"
import { getOrCreateDomainVerificationToken } from "@/lib/auth0/domain-verification"
import { Button } from "@/components/ui/button"
import { AppBreadcrumb } from "@/components/common/app-breadcrumb"

import { CreateOidcConnectionForm } from "./create-oidc-connection-form"

export default async function CreateOidcConnection() {
  const session = await appClient.getSession()

  const domainVerificationToken = await getOrCreateDomainVerificationToken(
    session!.user.org_id
  )

  return (
    <div className="space-y-1">
      <div className="px-2 py-3">
        <AppBreadcrumb
          title="Back to connections"
          href="/team/sso"
        />
      </div>

      <CreateOidcConnectionForm
        domainVerificationToken={domainVerificationToken}
      />
    </div>
  )
}
