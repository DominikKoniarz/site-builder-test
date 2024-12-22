import { getPageWithVariablesById } from "@/data-access/pages";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{
        pageId: string;
    }>;
};

// revalidated after template has been edited
// export const generateStaticParams = async (): Promise<
//     { templateId: string }[]
// > => {
//     const templates = await getAllTemplates();
//     return templates.map((template) => ({
//         templateId: template.id,
//     }));
// };

export default async function Templates({ params }: Props) {
    const { pageId } = await params;
    const page = await getPageWithVariablesById(pageId);

    if (!page) redirect("/templates");

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="flex flex-col gap-4">
                {page.variables.map((variable) => (
                    <div
                        key={variable.id}
                        className="flex flex-row items-center gap-8"
                    >
                        <p className="">{variable.id}</p>
                        <h1 className="text-xl font-bold">{variable.name}</h1>
                        <p>{variable.tag}</p>
                        <p>{variable.type}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
