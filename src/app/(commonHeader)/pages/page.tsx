import { getAllPages } from "@/data-access/pages";
import PagesList from "./_components/pages-list";

export default async function Pages() {
    const pages = await getAllPages();

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Pages</h1>
                <PagesList pages={pages} />
            </div>
        </main>
    );
}
