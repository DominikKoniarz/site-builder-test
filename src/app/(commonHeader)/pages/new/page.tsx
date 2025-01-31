import { getAllTemplates } from "@/data-access/templates";
import AddPageForm from "./_components/add-page-form";

export const dynamic = "force-dynamic";

export default async function NewPage() {
    const templates = await getAllTemplates();

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Add new page</h1>
                <AddPageForm templates={templates} />
            </div>
        </main>
    );
}
