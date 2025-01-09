import type { PageWithVariablesDTO } from "@/dto/pages.dto";
import type {
    PageEditBannerImageExistingSchema,
    PageEditBannerVariableSchema,
    PageEditTextVariableSchema,
} from "@/schema/pages/page-variables-schemas";
import {
    type PageEditSchema,
    pageEditSchema,
} from "@/schema/pages/page-edit-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { editPageAction } from "@/actions/pages";
import toast from "react-hot-toast";
import { actionError } from "@/lib/action-error";
import { nanoid } from "nanoid";

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
                        textVariableId: variable.textVariableId,
                        type: variable.type,
                        value: variable.value,
                    } satisfies PageEditTextVariableSchema;
                } else if (variable.type === "BANNER") {
                    return {
                        id: variable.id,
                        bannerVariableId: variable.bannerVariableId,
                        type: variable.type,
                        images: variable.images.map(
                            (image) =>
                                ({
                                    id: image.id,
                                    frontendId: nanoid(),
                                    imageName: image.imageName,
                                    order: image.order,
                                    type: "existing",
                                    cropData: {
                                        x: image.cropX,
                                        y: image.cropY,
                                        width: image.cropWidth,
                                        height: image.cropHeight,
                                    },
                                }) satisfies PageEditBannerImageExistingSchema,
                        ),
                    } satisfies PageEditBannerVariableSchema;
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
                        textVariableId: variable.textVariableId,
                        type: variable.type,
                        value: variable.value,
                    } satisfies PageEditTextVariableSchema;
                } else if (variable.type === "BANNER") {
                    return {
                        id: variable.id,
                        bannerVariableId: variable.bannerVariableId,
                        type: variable.type,
                        images: variable.images.map(
                            (image) =>
                                ({
                                    id: image.id,
                                    frontendId: nanoid(),
                                    imageName: image.imageName,
                                    order: image.order,
                                    type: "existing",
                                    cropData: {
                                        x: image.cropX,
                                        y: image.cropY,
                                        width: image.cropWidth,
                                        height: image.cropHeight,
                                    },
                                }) satisfies PageEditBannerImageExistingSchema,
                        ),
                    } satisfies PageEditBannerVariableSchema;
                }
            }),
        });
    }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

    const { execute: submit, isPending } = useAction(editPageAction, {
        onSuccess: () => {
            // here sth else
            // toast.success("Page eddited successfully");
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

export default useEditPageForm;
