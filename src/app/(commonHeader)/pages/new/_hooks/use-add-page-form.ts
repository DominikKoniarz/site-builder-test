import {
    type PageAddSchema,
    pageAddSchema,
} from "@/schema/pages/page-add-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { actionError } from "@/lib/action-error";
import { addPageAction } from "@/actions/pages";
import toast from "react-hot-toast";

const useAddPageForm = () => {
    const form = useForm<PageAddSchema>({
        resolver: zodResolver(pageAddSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: null,
            slug: "",
            templateId: "",
        },
    });

    const { execute: submit, isPending } = useAction(addPageAction, {
        onSuccess: () => {
            toast.success("Page added successfully");
        },
        onError: (error) => {
            actionError(error).serverError().validationErrors();
        },
    });

    return {
        form,
        submit,
        isPending,
    };
};

export default useAddPageForm;
