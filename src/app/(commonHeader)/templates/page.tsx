import TemplateList from "./_components/template-list";
import { getTemplates } from "./templates-content";

export const dynamic = "force-dynamic";

export default async function Templates() {
    const templates = await getTemplates();

    return (
        <main className="grid h-full w-full place-items-center">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Templates</h1>
                <TemplateList templates={templates} />
            </div>
        </main>
    );
}
