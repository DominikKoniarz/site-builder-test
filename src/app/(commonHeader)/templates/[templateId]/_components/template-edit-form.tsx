"use client";

import type { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import { Form } from "@/components/ui/form";
import TemplateVarDecider from "@/components/templates/template-var-decider";
import TemplateNameInput from "@/components/templates/template-name-input";
import TemplateDescTextarea from "@/components/templates/template-desc-textarea";
import useEditTemplateForm from "../_hooks/use-edit-template-form";

type Props = {
    template: TemplateWithVariablesDTO;
};

export default function TemplateEditForm({ template }: Props) {
    const { form } = useEditTemplateForm(template);

    const variables = form.watch("variables");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    console.log(data);
                })}
                className="flex w-full flex-col gap-4"
            >
                <TemplateNameInput />
                <TemplateDescTextarea />
                {variables.map((field, index) => (
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
