import axios, { AxiosRequestConfig } from "axios";

const regularHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

// Testorch Axios Configuration
const TestorchAxiosConfig = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TESTORCH_BACKEND_API_BASE_URL, // Ensure this is defined in .env
    timeout: 5000,
    headers: regularHeaders,
});

// Function to configure the instance with an access token
export const setAuthorizationToken = (token: string) => {
    if (token) {
        TestorchAxiosConfig.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        delete TestorchAxiosConfig.defaults.headers.Authorization;
        console.warn("Access token removed from Axios defaults.");
    }
};

export const setContentHeader = (contentType: string) => {
    TestorchAxiosConfig.defaults.headers["Content-Type"] = contentType;
}

// Response interceptor to catch and log errors
TestorchAxiosConfig.interceptors.response.use(
    response => response,
    error => {
        console.error("Interceptor caught error:", error);
        return Promise.reject(error);
    }
);

export { TestorchAxiosConfig };
