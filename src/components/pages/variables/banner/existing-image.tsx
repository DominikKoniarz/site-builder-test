import usePageForm from "@/hooks/use-page-form";
import { generateBannerImagePublicURL } from "@/lib/images";
import { PageEditBannerImageExistingSchema } from "@/schema/pages/page-variables-schemas";
import Image from "next/image";

type Props = {
    image: PageEditBannerImageExistingSchema;
    index: number;
};

export default function ExistingImage({ image, index }: Props) {
    const form = usePageForm();
    const pageId = form.watch("id");
    const variableId = form.watch(`variables.${index}.id`);

    const src = generateBannerImagePublicURL(
        pageId,
        variableId,
        image.id,
        "original",
        image.imageName,
    );

    return (
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg">
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
        </div>
    );
}
