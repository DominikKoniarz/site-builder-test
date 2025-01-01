import { LoaderCircle } from "lucide-react";

export default function LoadingImage() {
    return (
        <div className="grid h-16 w-16 place-items-center rounded-lg border">
            <div className="h-fit w-fit animate-spin">
                <LoaderCircle size={28} />
            </div>
        </div>
    );
}
