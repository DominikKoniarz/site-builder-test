import CropImageDialog from "./crop-image-dialog";
import DeleteImageDialog from "./delete-image-dialog";

type Props = {
    imageIndex: number;
    src: string;
};

export default function ImageOptions({ imageIndex, src }: Props) {
    return (
        <div className="group absolute left-1/2 top-1/2 grid h-full w-full -translate-x-1/2 -translate-y-1/2 place-items-center bg-transparent">
            <div className="flex flex-row gap-2.5 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
                <CropImageDialog src={src} imageIndex={imageIndex} />
                <DeleteImageDialog imageIndex={imageIndex} />
            </div>
        </div>
    );
}
