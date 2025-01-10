import CropImageDialog from "./crop-image-dialog";
import DeleteImageDialog from "./delete-image-dialog";

type Props = {
    imageIndex: number;
    src: string;
};

export default function ImageOptions({ imageIndex, src }: Props) {
    return (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-row gap-2.5">
            <CropImageDialog src={src} imageIndex={imageIndex} />
            <DeleteImageDialog imageIndex={imageIndex} />
        </div>
    );
}
