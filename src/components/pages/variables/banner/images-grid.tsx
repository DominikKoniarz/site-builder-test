import usePageForm from "@/hooks/use-page-form";
import LoadingImage from "./loading-image";
import NewImage from "./new-image";
import ExistingImage from "./existing-image";

export default function ImagesGrid({ index }: { index: number }) {
    const form = usePageForm();

    const variable = form.watch(`variables.${index}`);
    const images = variable.type === "BANNER" ? variable.images : [];

    if (!images.length) return null;

    return (
        <div className="mb-2 flex h-fit w-full flex-row flex-wrap gap-4">
            {images.map((image) =>
                image.type === "loading" ? (
                    <LoadingImage key={image.frontendId} />
                ) : image.type === "new" ? (
                    <NewImage key={image.frontendId} image={image} />
                ) : (
                    <ExistingImage key={image.frontendId} image={image} />
                ),
            )}
        </div>
    );
}
