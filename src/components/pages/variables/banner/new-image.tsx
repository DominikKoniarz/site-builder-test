import type { PageEditBannerImageNewSchema } from "@/schema/pages/page-variables-schemas";
import { generateTmpImagePublicURL } from "@/lib/images";
import Image from "next/image";
import ImageOptions from "./image-options";

type Props = {
    image: PageEditBannerImageNewSchema;
    imageIndex: number;
};

export default function NewImage({ image, imageIndex }: Props) {
    const src = generateTmpImagePublicURL(image);

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
            <ImageOptions imageIndex={imageIndex} src={src} />
        </div>
    );
}
