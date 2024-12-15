import type { ActionError, ActionErrorHandler } from "@/types/safe-action";
import toast from "react-hot-toast";

export const actionError = (error: ActionError): ActionErrorHandler => {
    return {
        serverError() {
            const serverError = error.error.serverError;

            if (serverError) {
                toast.error(serverError);
            }
            return this;
        },
        validationErrors() {
            const validationErrors = error.error.validationErrors?.fieldErrors;

            if (validationErrors) {
                Object.values(validationErrors).forEach((errors) => {
                    if (errors && errors.length > 0) toast.error(errors[0]);
                });
            }
            return this;
        },
    };
};
