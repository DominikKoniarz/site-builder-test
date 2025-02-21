import { getAllPages } from "@/data-access/pages";
import PagesList from "./_components/pages-list";

export const dynamic = "force-dynamic";

export default async function Pages() {
    const pages = await getAllPages();

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="flex w-full max-w-[400px] flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Pages</h1>
                {pages.length > 0 ? (
                    <PagesList pages={pages} />
                ) : (
                    <p className="mx-auto w-fit italic">No pages found</p>
                )}
            </div>
        </main>
    );
}
