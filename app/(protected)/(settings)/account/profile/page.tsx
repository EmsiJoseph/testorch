import { appClient } from "@/lib/auth0/auth0"
import { PageHeader } from "@/components/common/page-header"

import { DeleteAccountForm } from "./delete-account-form"
import { DisplayNameForm } from "./display-name-form"

export default appClient.withPageAuthRequired(
  async function Profile() {
    const session = await appClient.getSession()

    return (
      <div className="space-y-2">
        <PageHeader
          title="Profile"
          description="Manage your personal information."
        />

        <DisplayNameForm displayName={session?.user.name} />

        <DeleteAccountForm />
      </div>
    )
  },
  { returnTo: "/account/profile" }
)
