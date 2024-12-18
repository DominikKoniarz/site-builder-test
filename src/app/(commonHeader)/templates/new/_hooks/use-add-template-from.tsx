import {
    type TemplateAddSchema,
    templateAddSchema,
} from "@/schema/templates/template-add-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { addTemplateAction } from "@/actions/templates";
import { actionError } from "@/lib/action-error";
import toast from "react-hot-toast";

const useAddTemplateForm = () => {
    const form = useForm<TemplateAddSchema>({
        defaultValues: {
            name: "",
            description: null,
            variables: [],
        },
        resolver: zodResolver(templateAddSchema),
        mode: "onChange",
    });

    const { execute: submit, isPending } = useAction(addTemplateAction, {
        onSuccess: () => {
            toast.success("Template added successfully");
        },
        onError: (error) => {
            actionError(error).serverError().validationErrors();
        },
    });

    // useEffect(() => {
    //     return () => {
    //         form.reset({
    //             name: "",
    //             description: null,
    //             variables: [],
    //         });
    //     };
    // }, [pathname]); // eslint-disable-line

    return {
        form,
        isPending,
        submit,
    };
};

export default useAddTemplateForm;
