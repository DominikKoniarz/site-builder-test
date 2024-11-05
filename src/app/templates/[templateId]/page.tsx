import { Suspense } from "react";
import TemplateContent from "./template-content";

type Props = {
    params: Promise<{
        templateId: string;
    }>;
};

// export const dynamic = "force-dynamic";

export default function Templates({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TemplateContent params={params} />
        </Suspense>
    );
}
