"use client";

import type { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import {
    type TemplateEditBannerVariableSchema,
    type TemplateEditSchema,
    type TemplateEditTextVariableSchema,
    templateEditSchema,
} from "@/schema/templates/template-edit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import VarDecider from "./var-decider";
import { Form } from "@/components/ui/form";

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

    const { fields } = useFieldArray({
        control: form.control,
        name: "variables", // This corresponds to the key in the schema
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    console.log(data);
                })}
                className="flex flex-col gap-4"
            >
                {fields.map((field, index) => (
                    <VarDecider
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
