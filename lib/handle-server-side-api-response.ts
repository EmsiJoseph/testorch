import axios, {AxiosResponse} from "axios";
import {IPostRequestResponse} from "@/types/interfaces";

interface IHandleServerSideApiResponseProps<T> {
    request: () => Promise<AxiosResponse<T>>;
    successMessage?: string;
    errorMessage?: string;
}

export const handleServerSideApiResponse = async <T>({
                                                         request,
                                                         successMessage = "Your request was successful! 🎉",
                                                         errorMessage = "Oops! Something went wrong. Please try again later.",
                                                     }: IHandleServerSideApiResponseProps<T>): Promise<IPostRequestResponse<T>> => {
    try {
        const response = await request();


        if (response.status === 200 || response.status === 201) {
            return {success: true, message: successMessage, data: response.data};
        }

        return { message: "Unexpected status code received.", data: response.data };
    } catch (error: unknown) {
        console.log("Error caught in handleServerSideApiResponse:", error);

        if (axios.isAxiosError(error)) {
            console.log("Axios error details:", error.response);
            if (error.response) {
                // Handle specific error codes
                if (error.response.status === 422) {
                    return { success: false, message: error.response.data?.message || errorMessage || "Invalid data provided." };
                }
                if (error.response.status === 401) {
                    return { success: false,  message: "Unauthorized access." };
                }
                if ([500, 404].includes(error.response.status)) {
                    return { success: false,  message: error.response.status === 500 ? error.response.data?.message : "Internal server error." || "Resource not found." };
                }
                // Catch any other 4xx or 5xx responses
                return { success: false,  message: error.response.data?.message || errorMessage  || "Unexpected server error." };
            }
        }
        // Log for any unexpected errors
        console.log("Non-Axios error:", error);
        return { success: false,  message: "An unexpected error occurred. Please try again." };
    }
};
