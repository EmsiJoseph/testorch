import { extractStringValues } from "./extract-string-values-from-nested-object";
import { handleClientSideApiResponse } from "../handlers/handle-client-side-api-response";

export const extractFormValidationErrorsAndTriggerToast = (errors: object) => {
    const responseData = extractStringValues(errors)
    // Filter out single-word items
    const finalResponseData = responseData.filter((data) => {
        // Check if the string contains more than one word
        return data.trim().split(' ').length > 1;
    });


    // Call the toast handler with mapped errors
    handleClientSideApiResponse({error: finalResponseData});
};
