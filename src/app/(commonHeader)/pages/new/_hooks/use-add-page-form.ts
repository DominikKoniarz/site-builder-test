import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageAddSchema, pageAddSchema } from "@/schema/pages/page-add-schema";

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

    return {
        form,
        submit: (data) => {
            console.log(data);
        },
        isPending: false,
    };
};

export default useAddPageForm;
