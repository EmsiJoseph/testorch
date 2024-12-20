import { redirect } from "next/navigation"

import { appClient, managementClient } from "@/lib/auth0/auth0"
import { getOrCreateDomainVerificationToken } from "@/lib/auth0/domain-verification"

import { UpdateSamlConnectionForm } from "./update-saml-connection-form"

export default async function UpdateSamlConnection({
  params,
}: {
  params: { connectionId: string }
}) {
  const session = await appClient.getSession()

  if (!session) {
    return redirect("/api/auth/login")
  }

  // ensure that the connection ID being fetched is owned by the organization
  const { data: enabledConnection } =
    await managementClient.organizations.getEnabledConnection({
      id: session.user.org_id,
      connectionId: params.connectionId,
    })

  if (!enabledConnection) {
    redirect("/team/sso")
  }

  const [domainVerificationToken, { data: connection }] = await Promise.all([
    getOrCreateDomainVerificationToken(session!.user.org_id),
    managementClient.connections.get({ id: params.connectionId }),
  ])

  return (
    <div>
      <UpdateSamlConnectionForm
        connection={{
          id: connection.id,
          name: connection.name,
          displayName: connection.display_name,
          assignMembershipOnLogin: enabledConnection.assign_membership_on_login,
          options: {
            signInUrl: connection.options.signInEndpoint,
            signOutUrl: connection.options.signOutEndpoint,
            userIdAttribute: connection.options.user_id_attribute,
            protocolBinding: connection.options.protocolBinding,
            domainAliases: connection.options.domain_aliases,
            signRequest: connection.options.signSAMLRequest,
          },
        }}
        domainVerificationToken={domainVerificationToken}
      />
    </div>
  )
}
