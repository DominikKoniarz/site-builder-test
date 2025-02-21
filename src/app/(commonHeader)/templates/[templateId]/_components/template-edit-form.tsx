"use client";

import type { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import { Form } from "@/components/ui/form";
import TemplateVarDecider from "@/components/templates/template-var-decider";
import TemplateNameInput from "@/components/templates/template-name-input";
import TemplateDescTextarea from "@/components/templates/template-desc-textarea";
import useEditTemplateForm from "../_hooks/use-edit-template-form";
import AddVariableButton from "@/components/templates/variables/add-variable-button";
import SubmitButton from "@/components/submit-button";
import DndVariablesWrapper from "@/components/templates/variables/dnd-variables-wrapper";

type Props = {
    template: TemplateWithVariablesDTO;
};

export default function TemplateEditForm({ template }: Props) {
    const { form, isPending, submit } = useEditTemplateForm(template);

    const variables = form.watch("variables");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    submit(data);
                })}
                className="flex w-fit flex-col items-center gap-4"
            >
                <TemplateNameInput />
                <TemplateDescTextarea />
                <DndVariablesWrapper>
                    {variables.map((field, index) => (
                        <TemplateVarDecider
                            key={field.frontendId}
                            index={index}
                            variable={field}
                        />
                    ))}
                </DndVariablesWrapper>
                <AddVariableButton />
                <SubmitButton className="mx-auto mt-8" isPending={isPending} />
            </form>
        </Form>
    );
}
