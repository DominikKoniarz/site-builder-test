"use client";

import { Form } from "@/components/ui/form";
import TemplateVarDecider from "@/components/templates/template-var-decider";
import TemplateNameInput from "@/components/templates/template-name-input";
import TemplateDescTextarea from "@/components/templates/template-desc-textarea";
import AddVariableButton from "@/components/templates/variables/add-variable-button";
import useAddTemplateForm from "../_hooks/use-add-template-from";
import SubmitButton from "@/components/submit-button";
import DndVariablesWrapper from "@/components/templates/variables/dnd-variables-wrapper";

export default function TemplateAddForm() {
    const { form, submit, isPending } = useAddTemplateForm();

    const variables = form.watch("variables");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => submit(data))}
                className="flex h-full w-full flex-col gap-4"
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
