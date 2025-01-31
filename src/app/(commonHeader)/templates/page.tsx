import { getAllTemplates } from "@/data-access/templates";
import TemplatesList from "./_components/templates-list";

export const dynamic = "force-dynamic";

export default async function Templates() {
    const templates = await getAllTemplates();

    return (
        <main className="flex h-full w-full flex-1 flex-row justify-center overflow-hidden p-5">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Templates</h1>
                {templates.length > 0 ? (
                    <TemplatesList initialTemplates={templates} />
                ) : (
                    <p className="mx-auto w-fit italic">No templates found</p>
                )}
            </div>
        </main>
    );
}
