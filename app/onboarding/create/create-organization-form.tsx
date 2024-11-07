"use client"

import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import slugify from "@sindresorhus/slugify"
import { toast } from "sonner"

import { handleClientSideApiResponse } from "@/lib/handlers/handle-client-side-api-response"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code } from "@/components/common/code"
import { SubmitButton } from "@/components/common/submit-button"
import { createOrganization } from "@/app/actions/create-auth0-org"
import { createTeam } from "@/app/actions/create-team"
import { signUp } from "@/app/actions/sign-up"

export function CreateOrganizationForm() {
  const { user } = useUser()
  const [name, setName] = useState("")

  return (
    <form
      action={async (formData: FormData) => {
        try {
          formData.set("email", user?.email || "")
          const signUpResponse = await signUp(formData)
          handleClientSideApiResponse({
            message: signUpResponse?.message,
            success: signUpResponse?.success,
          })

          if (!signUpResponse?.success) return

          const { error, organizationId } = await createOrganization(formData)

          if (error) {
            toast.error(error)
            return
          }

          toast.success("Your team has been created.")

          if (!organizationId) {
            toast.error("Something went wrong.")
            return
          }

          formData.set("organization_id", organizationId)

          const influxDbResponse = await createTeam(formData)
          handleClientSideApiResponse({
            message: influxDbResponse?.message,
            success: influxDbResponse?.success,
          })
        } catch (err) {
          toast.error("An unexpected error occurred.")
        }
      }}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={user?.email || ""}
            id="email"
            placeholder="name@example.com"
            type="email"
            disabled
            readOnly
          />
          <input type="hidden" name="email" value={user?.email || ""} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="organization_name">Team Name</Label>
          <Input
            id="organization_name"
            name="organization_name"
            placeholder="Acme Corp"
            type="text"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Slug: <Code>{slugify(name || "Acme Corp")}</Code>
          </p>
        </div>
        <SubmitButton>Create Team</SubmitButton>
      </div>
    </form>
  )
}
