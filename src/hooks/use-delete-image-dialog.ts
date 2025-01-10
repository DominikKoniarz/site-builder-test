import { usePageBannerVarContext } from "@/context/page-banner-var-context";
import { useState } from "react";
import usePageForm from "./use-page-form";

const useDeleteImageDialog = (imageIndex: number) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { index } = usePageBannerVarContext();
    const form = usePageForm();

    const removeImage = () => {
        const images = form.getValues(`variables.${index}.images`);

        form.setValue(
            `variables.${index}.images`,
            images.filter((_, i) => i !== imageIndex),
        );

        setIsOpen(false);
    };

    return {
        isOpen,
        setIsOpen,
        removeImage,
    };
};

export default useDeleteImageDialog;
