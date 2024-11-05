import { Suspense } from "react";
import TemplatesContent from "./templates-content";

// export const dynamic = "force-dynamic";

export default async function Templates() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TemplatesContent />
        </Suspense>
    );
}
