import { appClient } from "@/lib/auth0/auth0"

import { AppBreadcrumb } from "@/components/common/app-breadcrumb"
import { getOrCreateDomainVerificationToken } from "@/lib/auth0/domain-verification"

import { CreateSamlConnectionForm } from "./create-saml-connection-form"

export default async function CreateSamlConnection() {
  const session = await appClient.getSession()

  const domainVerificationToken = await getOrCreateDomainVerificationToken(
    session!.user.org_id
  )

  return (
    <div className="space-y-1">
      <div className="px-2 py-3">
        <AppBreadcrumb title="Back to connections" href="/team/sso" />
      </div>

      <CreateSamlConnectionForm
        domainVerificationToken={domainVerificationToken}
      />
    </div>
  )
}
