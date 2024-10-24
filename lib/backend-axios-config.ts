import axios from "axios";
import {getAccessToken} from "@auth0/nextjs-auth0";

const regularHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

// Pahiram Axios Configuration
const TestorchAxiosConfig = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TESTORCH_BACKEND_API_BASE_URL, // Ensure this is defined in .env
    headers: regularHeaders,
});


// Request interceptor for Pahiram API
TestorchAxiosConfig.interceptors.request.use(
    async (config) => {
        try {
            const {accessToken} = await getAccessToken(); // Adjust as needed for your Auth0 setup
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.error("Error fetching access token", error);
            // Handle error (e.g., redirect to login if token cannot be fetched)
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);


export {TestorchAxiosConfig};
