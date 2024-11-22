"use cache";

import { unstable_cacheLife } from "next/cache";

export default async function Header() {
    unstable_cacheLife({
        stale: 5,
        revalidate: 5,
        // expire: 10, // this throws
    });

    const date = new Date();
    const lastRenderedAt: string = date.toISOString().slice(11, 23);

    return (
        <header className="w-full bg-slate-700 p-5 text-center font-bold text-white">
            Header of all pages. Last rendered at: {lastRenderedAt}
        </header>
    );
}
