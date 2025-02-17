import usePageBannerVariableDropzone from "@/hooks/use-page-banner-variable-dropzone";
import { usePageBannerVarContext } from "@/context/page-banner-var-context";
import ImagesGrid from "./images-grid";

export default function PageBannerVariable() {
    const { index, dbVariable } = usePageBannerVarContext();

    const { getRootProps, getInputProps, isDragActive } =
        usePageBannerVariableDropzone(index);

    return (
        <div className="flex flex-col gap-2 rounded-xl border bg-slate-800 p-4 pt-3">
            <label className="text-sm font-medium">{dbVariable.name}</label>
            <ImagesGrid />
            <div
                className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed p-3.5 text-xs font-medium"
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {isDragActive
                    ? "Drop your images here"
                    : "Drag and drop your images here"}
            </div>
        </div>
    );
}
