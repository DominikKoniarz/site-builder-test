import type { PageAddSchema } from "@/schema/pages/page-add-schema";
import { useFormContext } from "react-hook-form";

const usePageForm = () => {
    const context = useFormContext<PageAddSchema>();

    if (!context) {
        throw new Error(
            "usePageForm must be used within a valid form provider",
        );
    }

    return context;
};

export default usePageForm;
