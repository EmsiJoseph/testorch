"use client";

import {toast} from "sonner";

export interface IClientSideApiHandlerResponse {
    message?: string;
    success?: boolean;
}

export const handleClientSideApiResponse = (
    response: IClientSideApiHandlerResponse | undefined
) => {
    if (!response) {
        // Handle case where response is undefined
        toast.error("Oops! Something went wrong.", {
            description: "No response from the server. Please try again later.",
            action: {
                label: "Retry",
                onClick: () => {
                    // Optionally define a retry action here
                },
            },
            duration: 5000,
            closeButton: true,
        });
        return;
    }

    if (response.message && response.success) {
        // Show success message as a toast notification
        toast.success("Success 🎉", {
            description: response.message,
            duration: 5000,
            closeButton: true,
        });
    } else {
        toast.error("Oops! Something went wrong.", {
            description: response.message,
            duration: 5000,
            closeButton: true,
        })
        return;
    }

};
