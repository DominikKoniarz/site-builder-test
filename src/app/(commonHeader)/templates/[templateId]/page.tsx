import { getTemplate } from "@/data-access/templates";
import { redirect } from "next/navigation";
// import { getTemplates } from "../templates-content";

type Props = {
    params: Promise<{
        templateId: string;
    }>;
};

// export const dynamic = "force-dynamic";

// export const generateStaticParams = async (): Promise<
//     { templateId: string }[]
// > => {
//     const templates = await getTemplates();
//     return templates.map((template) => ({
//         templateId: template.id,
//     }));
// };

export default async function Templates({ params }: Props) {
    const { templateId } = await params;
    const template = await getTemplate(templateId);

    if (!template) redirect("/templates");

    return (
        <main className="grid h-full w-full place-items-center">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Template: {template.name}</h1>
            </div>
        </main>
    );
}
