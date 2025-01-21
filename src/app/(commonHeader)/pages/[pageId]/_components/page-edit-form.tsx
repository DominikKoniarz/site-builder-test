"use client";

import type { PageWithVariablesDTO } from "@/dto/pages.dto";
import useEditPageForm from "../_hooks/use-edit-page-form";
import { Form } from "@/components/ui/form";
import PageNameInput from "@/components/pages/page-name-input";
import PageSlugInput from "@/components/pages/page-slug-input";
import PageDescTextarea from "@/components/pages/page-desc-textarea";
import PageVarDecider from "@/components/pages/page-var-decider";
import SubmitButton from "@/components/submit-button";

type Props = {
    page: PageWithVariablesDTO;
};

export default function PageEditForm({ page }: Props) {
    const { form, isPending, submit } = useEditPageForm(page);

    const variables = form.watch("variables");

    console.log(form.formState.errors);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    submit(data);
                })}
                className="flex w-full max-w-sm flex-col gap-4"
            >
                <PageNameInput />
                <PageSlugInput />
                <PageDescTextarea />
                {variables.map((field, index) => (
                    <PageVarDecider
                        key={field.id}
                        index={index}
                        formVariable={field}
                        dbVariable={page.variables[index]}
                    />
                ))}
                <SubmitButton
                    className="mx-auto mt-8"
                    isPending={isPending}
                    text="Save"
                />
            </form>
        </Form>
    );
}
