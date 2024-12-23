import type { TemplateAddSchema } from "@/schema/templates/template-add-schema";
import type { TemplateEditSchema } from "@/schema/templates/template-edit-schema";
import { useFormContext } from "react-hook-form";

// This hook is used to get add new template and edit template form context
const useTemplateForm = () => {
    const context = useFormContext<TemplateAddSchema | TemplateEditSchema>();

    if (!context) {
        throw new Error(
            "useTemplateForm must be used within a valid form provider",
        );
    }

    return context;
};

export default useTemplateForm;
