import type { PageWithVariablesDTO } from "@/dto/pages.dto";
import {
    type PageEditBannerVariableSchema,
    pageEditSchema,
    type PageEditTextVariableSchema,
    type PageEditSchema,
} from "@/schema/pages/page-edit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useEditPageForm = (page: PageWithVariablesDTO) => {
    const form = useForm<PageEditSchema>({
        mode: "onChange",
        resolver: zodResolver(pageEditSchema),
        defaultValues: {
            id: page.id,
            description: page.description,
            name: page.name,
            slug: page.slug,
            variables: page.variables.map((variable) => {
                if (variable.type === "TEXT") {
                    return {
                        id: variable.id,
                        type: variable.type,
                        value: variable.value,
                    } as PageEditTextVariableSchema;
                } else if (variable.type === "BANNER") {
                    return {
                        id: variable.id,
                        type: variable.type,
                        images: variable.images.map((image) => ({
                            id: image.id,
                            imageName: image.imageName,
                            order: image.order,
                        })),
                    } as PageEditBannerVariableSchema;
                }
            }),
        },
    });

    useEffect(() => {
        form.reset({
            id: page.id,
            description: page.description,
            name: page.name,
            slug: page.slug,
            variables: page.variables.map((variable) => {
                if (variable.type === "TEXT") {
                    return {
                        id: variable.id,
                        type: variable.type,
                        value: variable.value,
                    } as PageEditTextVariableSchema;
                } else if (variable.type === "BANNER") {
                    return {
                        id: variable.id,
                        type: variable.type,
                        images: variable.images.map((image) => ({
                            id: image.id,
                            imageName: image.imageName,
                            order: image.order,
                        })),
                    } as PageEditBannerVariableSchema;
                }
            }),
        });
    }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        form,
        submit: (data: any) => {
            console.log(data);
        },
        isPending: false,
    };
};

export default useEditPageForm;
