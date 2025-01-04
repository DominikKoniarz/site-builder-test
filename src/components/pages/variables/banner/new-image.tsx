import type { PageEditBannerImageNewSchema } from "@/schema/pages/page-variables-schemas";
import { generateImagePublicURL } from "@/lib/images";
import Image from "next/image";
import CropImageDialog from "./crop-image-dialog";

type Props = {
    image: PageEditBannerImageNewSchema;
    imageIndex: number;
};

export default function NewImage({ image, imageIndex }: Props) {
    const src = generateImagePublicURL(image);

    return (
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg">
            <Image
                src={src}
                width={100} // a little bit bigger than width for more quality
                height={100} // a little bit bigger than height for more quality
                alt={`New image ${image.imageName}`}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CropImageDialog src={src} imageIndex={imageIndex} />
            </div>
        </div>
    );
}
