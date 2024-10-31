import { getPageVariable } from "@/lib/getPageVariable";
import prisma from "@/lib/prisma";

export default async function Home() {
    const page = await prisma.page.findFirst({
        where: {
            slug: "/",
        },
        select: {
            id: true,
            name: true,
            slug: true,
            variables: {
                select: {
                    id: true,
                    templateVariable: {
                        select: {
                            id: true,
                            name: true,
                            type: true,
                        },
                    },
                    bannerVariable: {
                        select: {
                            id: true,
                            createdAt: true,
                            updatedAt: true,
                            images: true,
                        },
                    },
                    textVariable: true,
                    order: true,
                },
                orderBy: {
                    order: "asc",
                },
            },
        },
    });

    // console.log(page);
    if (!page) return null;

    const heading = getPageVariable(
        page.variables,
        // TODO: Add extracting by 'code-name' - something wihtout spaces
        "Heading w sekcji hero",
        "TEXT",
    );

    const banner = getPageVariable(page.variables, "Hero banner", "BANNER");

    console.log(heading);
    console.log(banner);

    return (
        <main className="h-fit w-full bg-slate-800 text-white">
            {heading && <h1 className="text-xl font-bold">{heading.value}</h1>}
            {banner && (
                <div className="flex flex-col">{banner.images.length}</div>
            )}
            {/* preety print json */}
            <div className="h-fit">
                <pre className="h-fit">{JSON.stringify(heading, null, 2)}</pre>
            </div>
        </main>
    );
}
