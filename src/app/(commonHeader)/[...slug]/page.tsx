import PrettyJson from "@/components/pretty-json";
import { getPageWithVariablesBySlug } from "@/data-access/pages";

type Props = {
    params: Promise<{
        slug: string[];
    }>;
};

export default async function SlugPage({ params }: Props) {
    const { slug } = await params;

    const page = await getPageWithVariablesBySlug("/" + slug.join("/"));

    return (
        <div>
            <PrettyJson data={page} />
        </div>
    );
}
