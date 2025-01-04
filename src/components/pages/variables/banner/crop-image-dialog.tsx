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
import { Crop } from "lucide-react";
import { useMemo, useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import ".pnpm/cropperjs@1.6.2/node_modules/cropperjs/dist/cropper.css"; // with npm path is different

type Props = {
    src: string;
    imageIndex: number;
};

export default function CropImageDialog({ src, imageIndex }: Props) {
    const { index, dbVariable } = usePageBannerVarContext();
    const form = usePageForm();

    const cropperRef = useRef<ReactCropperElement>(null);

    const cropData = form.watch(
        `variables.${index}.images.${imageIndex}.cropData`,
    );
    const frontendId = form.watch(
        `variables.${index}.images.${imageIndex}.frontendId`,
    );

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (!cropper) return;

        const data = cropper.getData();

        const image = form.getValues(`variables.${index}.images.${imageIndex}`);
        if (image.type !== "new") return;

        form.setValue(`variables.${index}.images.${imageIndex}`, {
            ...image,
            cropData: {
                x: data.x,
                y: data.y,
                width: data.width,
                height: data.height,
            },
        });
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
                    <Crop />
                </Button>
            </DialogTrigger>
            <DialogContent className="border-0 bg-slate-800 text-white sm:max-w-fit">
                <DialogHeader>
                    <DialogTitle className="text-white">Crop image</DialogTitle>
                    <DialogDescription className="text-white/80">
                        Crop the image to fit your needs
                    </DialogDescription>
                </DialogHeader>
                <div className="h-[500px] w-[500px]">
                    <Cropper
                        key={frontendId}
                        src={src}
                        style={{ height: 400, width: "100%" }}
                        // Cropper.js options
                        viewMode={1}
                        aspectRatio={aspectRatio}
                        initialAspectRatio={aspectRatio}
                        data={cropData ?? undefined}
                        guides={true}
                        zoomable={false}
                        background={true}
                        checkOrientation={false}
                        responsive={true}
                        ref={cropperRef}
                        crop={onCrop}
                        ready={() => {
                            const cropper = cropperRef.current?.cropper;
                            if (!cropper) return;

                            cropper.setData({
                                x: cropData?.x,
                                y: cropData?.y,
                                width: cropData?.width,
                                height: cropData?.height,
                            });
                        }}
                    />
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
