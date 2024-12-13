"use client";

import { Form } from "@/components/ui/form";
import TemplateVarDecider from "@/components/templates/template-var-decider";
import TemplateNameInput from "@/components/templates/template-name-input";
import TemplateDescTextarea from "@/components/templates/template-desc-textarea";
import AddVariableButton from "@/components/templates/variables/add-variable-button";
import useAddTemplateForm from "../_hooks/use-add-template-from";

export default function TemplateAddForm() {
    const { form } = useAddTemplateForm();

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
