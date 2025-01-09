"use client";

import { usePooling } from "@/hooks/use-pooling";
import { LoaderCircle } from "lucide-react";

export default function PageProcessing() {
    usePooling(1500);

    return (
        <div className="mx-auto mt-8 flex flex-col items-center gap-4">
            <p className="">Page is being processed...</p>
            <div className="h-fit w-fit animate-spin">
                <LoaderCircle size={30} />
            </div>
        </div>
    );
}
