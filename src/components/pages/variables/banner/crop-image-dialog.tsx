import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { usePageBannerVarContext } from "@/context/page-banner-var-context";
import usePageForm from "@/hooks/use-page-form";
import { CropIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import ReactCrop, { type PixelCrop, type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
    src: string;
    imageIndex: number;
};

export default function CropImageDialog({ src, imageIndex }: Props) {
    const { index, dbVariable } = usePageBannerVarContext();
    const form = usePageForm();

    const imgRef = useRef<HTMLImageElement | null>(null);

    const [crop, setCrop] = useState<Crop | undefined>();

    const onCrop = (data: PixelCrop) => {
        const image = form.getValues(`variables.${index}.images.${imageIndex}`);
        if (image.type !== "new") return;

        // calculate real image size crop data
        const img = imgRef.current;
        if (!img) return;

        const realWidth = img.naturalWidth;
        const realHeight = img.naturalHeight;

        const cropData = {
            x: (data.x / img.width) * realWidth,
            y: (data.y / img.height) * realHeight,
            width: (data.width / img.width) * realWidth,
            height: (data.height / img.height) * realHeight,
        };

        form.setValue(`variables.${index}.images.${imageIndex}`, {
            ...image,
            cropData,
        });

        setCrop(data);
    };

    const aspectRatio: number = useMemo(
        () =>
            dbVariable.config
                ? dbVariable.config.imageWidth / dbVariable.config.imageHeight
                : 1,
        [dbVariable.config],
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    className="h-8 w-8 bg-white p-1 text-black hover:bg-white/90 [&_svg]:size-5"
                >
                    <CropIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="border-0 bg-slate-800 text-white sm:max-w-fit">
                <DialogHeader>
                    <DialogTitle className="text-white">Crop image</DialogTitle>
                    <DialogDescription className="text-white/80">
                        Crop the image to fit your needs
                    </DialogDescription>
                </DialogHeader>
                <div className="grid max-h-[500px] max-w-[500px] place-items-center">
                    <ReactCrop
                        className="max-h-[500px] max-w-[500px]"
                        crop={crop}
                        aspect={aspectRatio}
                        onChange={(c) => onCrop(c)}
                    >
                        <img
                            src={src}
                            ref={imgRef}
                            className="max-h-[500px] max-w-[500px]"
                            onLoad={() => {
                                const img = imgRef.current;
                                if (!img) return;

                                const cropData = form.getValues(
                                    `variables.${index}.images.${imageIndex}.cropData`,
                                );
                                if (!cropData) return;

                                const realWidth = img.naturalWidth;
                                const realHeight = img.naturalHeight;

                                setCrop({
                                    x: (cropData.x / realWidth) * img.width,
                                    y: (cropData.y / realHeight) * img.height,
                                    width:
                                        (cropData.width / realWidth) *
                                        img.width,
                                    height:
                                        (cropData.height / realHeight) *
                                        img.height,
                                    unit: "px",
                                });
                            }}
                        />
                    </ReactCrop>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
