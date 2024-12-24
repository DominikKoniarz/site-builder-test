import { getAllPages, getPageWithVariablesById } from "@/data-access/pages";
import { redirect } from "next/navigation";
import PageEditForm from "./_components/page-edit-form";

type Props = {
    params: Promise<{
        pageId: string;
    }>;
};

// revalidated after page has been edited or (template has been edited and page has been updated)
export const generateStaticParams = async (): Promise<{ pageId: string }[]> => {
    const pages = await getAllPages();
    return pages.map((page) => ({
        pageId: page.id,
    }));
};

export default async function Templates({ params }: Props) {
    const { pageId } = await params;
    const page = await getPageWithVariablesById(pageId);

    if (!page) redirect("/templates");

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Edit page</h1>
                <PageEditForm page={page} />
            </div>
        </main>
    );
}
