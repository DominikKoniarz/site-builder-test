import prisma from "@/lib/prisma";
import Link from "next/link";

type Props = {
    params: Promise<{
        templateId: string;
    }>;
};

export const dynamic = "force-dynamic";

export default async function Templates({ params }: Props) {
    const templateId = (await params).templateId;

    const template = await prisma.template.findUnique({
        where: {
            id: templateId,
        },
        select: {
            id: true,
            name: true,
            description: true,
            variables: {
                select: {
                    id: true,
                    order: true,
                    name: true,
                    tag: true,
                    bannerTemplateVariableConfig: true,
                    type: true,
                },
                orderBy: {
                    order: "asc",
                },
            },
        },
    });

    return (
        <main className="h-fit w-full bg-slate-800 text-white">
            {template && (
                <div className="flex flex-col gap-2 border border-white p-2">
                    <h1 className="text-xl font-bold">Name: {template.name}</h1>
                    {template.description && (
                        <p className="text-sm">{template.description}</p>
                    )}
                    {template.variables.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {template.variables.map((variable) => (
                                <div
                                    key={variable.id}
                                    className="flex flex-col gap-2 border border-white p-2"
                                >
                                    <h1 className="text-xl font-bold">
                                        Var name: {variable.name}
                                    </h1>
                                    <p className="text-sm">
                                        Tag: {variable.tag}
                                    </p>
                                    <p className="text-sm">
                                        Type: {variable.type}
                                    </p>
                                    <p className="text-sm">
                                        Order: {variable.order}
                                    </p>
                                    {variable.bannerTemplateVariableConfig && (
                                        <div className="text-sm">
                                            Config:
                                            <div className="ml-14 flex flex-col gap-2">
                                                <p className="text-sm">
                                                    Width:{" "}
                                                    {
                                                        variable
                                                            .bannerTemplateVariableConfig
                                                            .imageWidth
                                                    }
                                                </p>
                                                <p className="text-sm">
                                                    Height:{" "}
                                                    {
                                                        variable
                                                            .bannerTemplateVariableConfig
                                                            .imageHeight
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <br />
            <Link href="/templates">Templates</Link>
        </main>
    );
}