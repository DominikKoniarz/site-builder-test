"use client";

import type { TemplateDTO } from "@/dto/templates.dto";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";
import useAddPageForm from "../_hooks/use-add-page-form";
import PageNameInput from "@/components/pages/page-name-input";
import PageDescTextarea from "@/components/pages/page-desc-textarea";
import PageTemplateSelect from "./page-template-select";
import PageSlugInput from "@/components/pages/page-slug-input";

type Props = {
    templates: TemplateDTO[];
};

export default function AddPageForm({ templates }: Props) {
    const { form, submit, isPending } = useAddPageForm();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => submit(data))}
                className="flex h-full w-full flex-col gap-4"
            >
                <PageNameInput />
                <PageSlugInput />
                <PageDescTextarea />
                <PageTemplateSelect templates={templates} />
                <SubmitButton className="mx-auto mt-8" isPending={isPending} />
            </form>
        </Form>
    );
}
