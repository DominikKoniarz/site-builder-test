import { getPageWithVariablesById } from "@/data-access/pages";
import { redirect } from "next/navigation";
import PageEditForm from "./_components/page-edit-form";
import PageProcessing from "./_components/page-processing";

type Props = {
    params: Promise<{
        pageId: string;
    }>;
};

export const dynamic = "force-dynamic";

export default async function Templates({ params }: Props) {
    const { pageId } = await params;
    const page = await getPageWithVariablesById(pageId);

    if (!page) redirect("/templates");

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="flex w-full flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Edit page</h1>
                {page.state === "READY" ? (
                    <PageEditForm page={page} />
                ) : (
                    <PageProcessing />
                )}
            </div>
        </main>
    );
}
