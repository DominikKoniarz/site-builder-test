import { usePageBannerVarContext } from "@/context/page-banner-var-context";
import { useEffect, useState } from "react";
import usePageForm from "./use-page-form";

const useDeleteImageDialog = (imageIndex: number) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);

    const { index } = usePageBannerVarContext();
    const form = usePageForm();

    const isNew: boolean =
        form.watch(`variables.${index}.images.${imageIndex}`).type === "new";

    const removeImage = () => {
        const images = form.getValues(`variables.${index}.images`);

        form.setValue(
            `variables.${index}.images`,
            images.filter((_, i) => i !== imageIndex),
        );

        setIsOpen(false);
    };

    // little bit fucked bc every call of hook will add new event listener, but works :)
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (!isOpen && e.key === "Shift") {
                setIsShiftPressed(true);
            }
        };

        const handleKeyup = (e: KeyboardEvent) => {
            if (!isOpen && e.key === "Shift") {
                setIsShiftPressed(false);
            }
        };

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("keyup", handleKeyup);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("keyup", handleKeyup);
        };
    }, [isOpen]);

    return {
        isOpen,
        setIsOpen,
        removeImage,
        isNew,
        isShiftPressed,
    };
};

export default useDeleteImageDialog;
