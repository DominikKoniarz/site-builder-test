import { editTemplateAction } from "@/actions/templates";
import type { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import { actionError } from "@/lib/action-error";
import {
    type TemplateEditSchema,
    templateEditSchema,
} from "@/schema/templates/template-edit-schema";
import type {
    TemplateEditBannerVariableSchema,
    TemplateEditTextVariableSchema,
} from "@/schema/templates/template-variables-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
                        frontendId: nanoid(),
                        name: variable.name,
                        tag: variable.tag,
                        type: variable.type,
                        order: variable.order,
                    } satisfies TemplateEditTextVariableSchema;
                else if (variable.type === "BANNER") {
                    return {
                        id: variable.id,
                        frontendId: nanoid(),
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

    const { execute: submit, isPending } = useAction(editTemplateAction, {
        onSuccess: () => {
            toast.success("Template eddited successfully", { duration: 3500 });
        },
        onError: (error) => {
            actionError(error).serverError().validationErrors();
        },
    });

    return {
        form,
        submit,
        isPending,
    };
};

export default useEditTemplateForm;
