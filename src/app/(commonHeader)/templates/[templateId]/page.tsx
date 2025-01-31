import {
    // getAllTemplates,
    getTemplateByIdWithVariables,
} from "@/data-access/templates";
import { redirect } from "next/navigation";
import TemplateEditForm from "./_components/template-edit-form";

type Props = {
    params: Promise<{
        templateId: string;
    }>;
};

// // revalidated after template has been edited
// export const generateStaticParams = async (): Promise<
//     { templateId: string }[]
// > => {
//     const templates = await getAllTemplates();
//     return templates.map((template) => ({
//         templateId: template.id,
//     }));
// };

export const dynamic = "force-dynamic";

export default async function Templates({ params }: Props) {
    const { templateId } = await params;
    const template = await getTemplateByIdWithVariables(templateId);

    if (!template) redirect("/templates");

    return (
        <main className="flex h-full w-full flex-row justify-center overflow-hidden p-5">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Edit template</h1>
                <TemplateEditForm template={template} />
            </div>
        </main>
    );
}
