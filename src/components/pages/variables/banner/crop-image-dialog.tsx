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
import useCropImageDialog from "@/hooks/use-crop-image-dialog";
import { CropIcon } from "lucide-react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
    src: string;
    imageIndex: number;
};

export default function CropImageDialog({ src, imageIndex }: Props) {
    const { aspectRatio, crop, imgRef, onCrop, onImgLoad, resetCrop } =
        useCropImageDialog(imageIndex);

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
                            onLoad={onImgLoad}
                        />
                    </ReactCrop>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={resetCrop}
                        >
                            Reset crop
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button">Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
