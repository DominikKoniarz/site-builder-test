"use client";

import type { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import {
    type TemplateEditBannerVariableSchema,
    type TemplateEditSchema,
    type TemplateEditTextVariableSchema,
    templateEditSchema,
} from "@/schema/templates/template-edit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TemplateVarDecider from "@/components/templates/template-var-decider";
import TemplateNameInput from "@/components/templates/template-name-input";
import TemplateDescTextarea from "@/components/templates/template-desc-textarea";

type Props = {
    template: TemplateWithVariablesDTO;
};

export default function TemplateEditForm({ template }: Props) {
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

    const fields = form.watch("variables");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    console.log(data);
                })}
                className="flex flex-col gap-4"
            >
                <TemplateNameInput />
                <TemplateDescTextarea />
                {fields.map((field, index) => (
                    <TemplateVarDecider
                        key={field.id}
                        index={index}
                        templateVariableType={field.type}
                    />
                ))}
                <button>xd</button>
            </form>
        </Form>
    );
}
