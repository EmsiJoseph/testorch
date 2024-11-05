"use server"

import {redirect} from "next/navigation"
import slugify from "@sindresorhus/slugify"

import {appClient, managementClient, onboardingClient} from "@/lib/auth0"

export async function createOrganization(formData: FormData) {
    const session = await onboardingClient.getSession()

    if (!session) {
        return redirect("/onboarding/signup")
    }


    const organizationName = formData.get("organization_name")

    if (!organizationName || typeof organizationName !== "string") {
        return {
            error: "Team name is required.",
        }
    }

    const {accessToken} = await appClient.getAccessToken();

    console.log(accessToken)
    try {
        const isExisting = await managementClient.organizations.getByName({
            name: slugify(organizationName),
        })

        if (isExisting) {
            return {
                error: "Team already exists.",
            }
        }
    } catch (error) {
        //     Don't do anything and just proceed
    }


    let organization

    try {
        ;({data: organization} = await managementClient.organizations.create({
            name: slugify(organizationName),
            display_name: organizationName,
            enabled_connections: [
                {
                    connection_id: process.env.DEFAULT_CONNECTION_ID,
                },
            ],
        }))

        await managementClient.organizations.addMembers(
            {
                id: organization.id,
            },
            {
                members: [session.user.sub],
            }
        )

        await managementClient.organizations.addMemberRoles(
            {
                id: organization.id,
                user_id: session.user.sub,
            },
            {
                roles: [process.env.AUTH0_ADMIN_ROLE_ID],
            }
        )


    } catch (error) {
        console.error("failed to create an organization", error)
        return {
            error: "Failed to create an organization.",
        }
    }

    const authParams = new URLSearchParams({
        organization: organization.id,
        returnTo: "/projects",
    })

    redirect(`/api/auth/login?${authParams.toString()}`)

}
