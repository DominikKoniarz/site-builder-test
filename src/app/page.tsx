import { getPageVariable } from "@/lib/getPageVariable";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
                            tag: true,
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

    if (!page) return null;

    const heading = getPageVariable(page.variables, "hero-heading", "TEXT");

    const banner = getPageVariable(page.variables, "hero-banner", "BANNER");

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
            <Link href="/templates">Templates</Link>
        </main>
    );
}
