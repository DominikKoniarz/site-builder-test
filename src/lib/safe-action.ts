import { env } from "@/env";
import {
    BadRequestError,
    ForbiddenError,
    UnauthorizedError,
} from "@/types/errors";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    handleServerError: (error) => {
        if (env.NEXT_PUBLIC_IS_DEV)
            console.error(
                `${new Date().toLocaleString()} Server action error: ${error.message}`,
                error,
            );

        if (error instanceof BadRequestError) {
            return error.message;
        }

        if (error instanceof UnauthorizedError) {
            return error.message;
        }

        if (error instanceof ForbiddenError) {
            return error.message;
        }

        return "Internal server error occured! Please try again later.";
    },
    defaultValidationErrorsShape: "flattened",
});
