import { Trash } from "lucide-react";
import CropImageDialog from "./crop-image-dialog";

type Props = {
    imageIndex: number;
    src: string;
};

export default function ImageOptions({ imageIndex, src }: Props) {
    return (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-row gap-2.5">
            <CropImageDialog src={src} imageIndex={imageIndex} />
            <div className="grid h-8 w-8 place-items-center rounded-md bg-white p-1 text-black hover:bg-white/90 [&_svg]:size-5">
                <Trash />
            </div>
        </div>
    );
}
