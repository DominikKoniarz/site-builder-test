import { getAllTemplates } from "@/data-access/templates";
import TemplateList from "./_components/template-list";

export const dynamic = "force-dynamic";

export default async function Templates() {
    const templates = await getAllTemplates();

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Templates</h1>
                <TemplateList templates={templates} />
            </div>
        </main>
    );
}
