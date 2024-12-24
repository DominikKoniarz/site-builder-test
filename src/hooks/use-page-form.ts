import type { PageAddSchema } from "@/schema/pages/page-add-schema";
import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import { useFormContext } from "react-hook-form";

const usePageForm = () => {
    const context = useFormContext<PageAddSchema | PageEditSchema>();

    if (!context) {
        throw new Error(
            "usePageForm must be used within a valid form provider",
        );
    }

    return context;
};

export default usePageForm;
