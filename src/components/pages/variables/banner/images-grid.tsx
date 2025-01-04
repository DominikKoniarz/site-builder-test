import usePageForm from "@/hooks/use-page-form";
import LoadingImage from "./loading-image";
import NewImage from "./new-image";
import ExistingImage from "./existing-image";
import { usePageBannerVarContext } from "@/context/page-banner-var-context";

export default function ImagesGrid() {
    const { index } = usePageBannerVarContext();
    const form = usePageForm();

    const variable = form.watch(`variables.${index}`);
    const images = variable.type === "BANNER" ? variable.images : [];

    if (!images.length) return null;

    return (
        <div className="mb-2 flex h-fit w-full flex-row flex-wrap gap-4">
            {images
                .sort((a, b) => a.order - b.order)
                .map((image, imageIndex) =>
                    image.type === "loading" ? (
                        <LoadingImage key={image.frontendId} />
                    ) : image.type === "new" ? (
                        <NewImage
                            key={image.frontendId}
                            imageIndex={imageIndex}
                            image={image}
                        />
                    ) : (
                        <ExistingImage key={image.frontendId} image={image} />
                    ),
                )}
        </div>
    );
}
