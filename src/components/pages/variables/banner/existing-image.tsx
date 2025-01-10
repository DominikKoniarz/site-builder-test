import usePageForm from "@/hooks/use-page-form";
import { generateBannerImagePublicURL } from "@/lib/images";
import { PageEditBannerImageExistingSchema } from "@/schema/pages/page-variables-schemas";
import Image from "next/image";
import ImageOptions from "./image-options";

type Props = {
    image: PageEditBannerImageExistingSchema;
    varIndex: number;
    imageIndex: number;
};

export default function ExistingImage({ image, varIndex, imageIndex }: Props) {
    const form = usePageForm();
    const pageId = form.watch("id");
    const variableId = form.watch(`variables.${varIndex}.id`);

    const src = generateBannerImagePublicURL(
        pageId,
        variableId,
        image.id,
        "original",
        image.imageName,
    );

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
                priority={true}
            />
            <ImageOptions imageIndex={imageIndex} src={src} />
        </div>
    );
}
