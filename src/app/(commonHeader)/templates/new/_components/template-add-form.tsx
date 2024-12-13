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
import AddVariableButton from "@/components/templates/variables/add-variable-button";

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

    const variables = form.watch("variables");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    console.log(data);
                })}
                className="flex h-full w-full flex-col gap-4"
            >
                <TemplateNameInput />
                <TemplateDescTextarea />
                {variables.map((field, index) => (
                    <TemplateVarDecider
                        // key={nanoid()}
                        key={index}
                        index={index}
                        templateVariableType={field.type}
                    />
                ))}
                <AddVariableButton />
                <button>xd</button>
            </form>
        </Form>
    );
}
