"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
    type TemplateAddSchema,
    templateAddSchema,
} from "@/schema/templates/template-add-schema";
import TemplateVarDecider from "@/components/templates/template-var-decider";
import TemplateNameInput from "@/components/templates/template-name-input";
import TemplateDescTextarea from "@/components/templates/template-desc-textarea";

export default function TemplateAddForm() {
    const form = useForm<TemplateAddSchema>({
        defaultValues: {
            name: "",
            description: null,
            variables: [],
        },
        resolver: zodResolver(templateAddSchema),
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
                        // CHYBA FOR NOW ONLY
                        key={`${field.name}-${index}`}
                        index={index}
                        templateVariableType={field.type}
                    />
                ))}
                <button>xd</button>
            </form>
        </Form>
    );
}
