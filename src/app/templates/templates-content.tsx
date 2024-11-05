import prisma from "@/lib/prisma";
import Link from "next/link";

export const getTemplates = () => {
    return prisma.template.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            _count: {
                select: {
                    variables: true,
                },
            },
        },
    });
};

export default async function TemplatesContent() {
    const templates = await getTemplates();

    return (
        <main className="h-fit w-full bg-slate-800 text-white">
            <div className="flex flex-col gap-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="flex flex-col gap-2 border border-white p-2"
                    >
                        <h1 className="text-xl font-bold">
                            Name: {template.name}
                        </h1>
                        {template.description && (
                            <p className="text-sm">{template.description}</p>
                        )}
                        <p className="text-sm">
                            Variables: {template._count.variables}
                        </p>
                        <Link href={`/templates/${template.id}`}>Edit</Link>
                    </div>
                ))}
            </div>
            <br />
            <Link href="/">Home</Link>
        </main>
    );
}
