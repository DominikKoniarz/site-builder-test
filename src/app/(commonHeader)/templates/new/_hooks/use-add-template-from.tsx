import {
    type TemplateAddSchema,
    templateAddSchema,
} from "@/schema/templates/template-add-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

    return {
        form,
    };
};

export default useAddTemplateForm;
