"use client";

import type { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import {
    type TemplateEditSchema,
    templateEditSchema,
} from "@/schema/template-edit-schema";
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
            variables: template.variables.map((variable) => ({
                ...variable,
                type: variable.type,
                order: variable.order,
                imageWidth: 0,
                imageHeight: 0,
            })),
        },
        resolver: zodResolver(templateEditSchema),
        mode: "onChange",
    });

    const { fields } = useFieldArray({
        control: form.control,
        name: "variables", // This corresponds to the key in the schema
    });

    console.log(form.formState.errors);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    console.log(data);
                })}
            >
                {fields.map((field, index) => (
                    <VarDecider
                        key={field.id}
                        index={index}
                        templateVariable={field}
                    />
                ))}
                <button>xd</button>
            </form>
        </Form>
    );
}
