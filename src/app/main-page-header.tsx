"use cache";

import { unstable_cacheLife } from "next/cache";

export default async function MainPageHeader() {
    unstable_cacheLife({
        stale: 5,
        revalidate: 5,
    });

    const date = new Date();
    const lastRenderedAt: string = date.toISOString().slice(11, 23);

    return (
        <div className="">
            Main page header last rendered at: {lastRenderedAt}
        </div>
    );
}
