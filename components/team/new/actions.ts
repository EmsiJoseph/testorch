"use server"

import {AxiosResponse} from "axios";
import {appClient} from "@/lib/auth0";
import {setAuthorizationToken, TestorchAxiosConfig} from "@/config/backend-axios-config";
import {postCreateTeamRoute} from "@/config/endpoints/team-management-routes";
import {handleServerSideApiResponse} from "@/lib/handle-server-side-api-response";

export async function createInfluxDbOrganization(formData: FormData) {
    const organizationName = formData.get("organization_name")
    // Call api to create an influxdb Org
    const request = async (): Promise<AxiosResponse<any>> => {
        const {accessToken} = await appClient.getAccessToken();

        // Set the access token in the Axios config
        if (accessToken) {
            setAuthorizationToken(accessToken);
        } else {
            console.error("No access token found.");
        }

        return await TestorchAxiosConfig.post(postCreateTeamRoute, {
            name: organizationName,
        });
    };

    return await handleServerSideApiResponse({
        request: request,
        successMessage: "Team created successfully!",
        errorMessage: "Failed to create team.",
    });
}