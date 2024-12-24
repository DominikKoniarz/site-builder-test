"use client";

import type { PageWithVariablesDTO } from "@/dto/pages.dto";
import useEditPageForm from "../_hooks/use-edit-page-form";
import { Form } from "@/components/ui/form";
import PageNameInput from "@/components/pages/page-name-input";
import PageSlugInput from "@/components/pages/page-slug-input";
import PageDescTextarea from "@/components/pages/page-desc-textarea";

type Props = {
    page: PageWithVariablesDTO;
};

export default function PageEditForm({ page }: Props) {
    const { form, isPending, submit } = useEditPageForm(page);

    const variables = form.watch("variables");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    submit(data);
                })}
                className="flex w-full flex-col gap-4"
            >
                <PageNameInput />
                <PageSlugInput />
                <PageDescTextarea />
            </form>
        </Form>
    );
}
