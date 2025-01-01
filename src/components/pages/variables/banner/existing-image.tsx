import { PageEditBannerImageExistingSchema } from "@/schema/pages/page-variables-schemas";

type Props = {
    image: PageEditBannerImageExistingSchema;
};

export default function ExistingImage({ image }: Props) {
    return (
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg">
            {image.id} {image.imageName}
        </div>
    );
}
