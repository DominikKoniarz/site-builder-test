import type { PageEditBannerImageNewSchema } from "@/schema/pages/page-variables-schemas";
import Image from "next/image";
import { env } from "@/env";

type Props = {
    image: PageEditBannerImageNewSchema;
};

export default function NewImage({ image }: Props) {
    return (
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg">
            <Image
                src={`https://${env.NEXT_PUBLIC_R2_BUCKET_HOSTNAME}/tmp-image/${image.tmpImageId}/${image.imageName}`}
                width={80} // a little bit bigger than width for more quality
                height={80} // a little bit bigger than height for more quality
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
