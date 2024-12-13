import type { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import {
    type TemplateEditBannerVariableSchema,
    type TemplateEditSchema,
    type TemplateEditTextVariableSchema,
    templateEditSchema,
} from "@/schema/templates/template-edit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useEditTemplateForm = (template: TemplateWithVariablesDTO) => {
    const form = useForm<TemplateEditSchema>({
        defaultValues: {
            id: template.id,
            name: template.name,
            description: template.description,
            variables: template.variables.map((variable) => {
                if (variable.type === "TEXT")
                    return {
                        id: variable.id,
                        name: variable.name,
                        tag: variable.tag,
                        type: variable.type,
                        order: variable.order,
                    } satisfies TemplateEditTextVariableSchema;
                else if (variable.type === "BANNER") {
                    return {
                        id: variable.id,
                        name: variable.name,
                        tag: variable.tag,
                        type: variable.type,
                        order: variable.order,
                        imageHeight: variable?.config?.imageHeight ?? 0,
                        imageWidth: variable?.config?.imageWidth ?? 0,
                    } satisfies TemplateEditBannerVariableSchema;
                }
            }),
        },
        resolver: zodResolver(templateEditSchema),
        mode: "onChange",
    });

    return {
        form,
    };
};

export default useEditTemplateForm;
