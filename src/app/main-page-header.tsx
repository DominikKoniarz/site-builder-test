"use cache";

import { unstable_cacheLife } from "next/cache";

export default async function MainPageHeader() {
    unstable_cacheLife({
        stale: 5,
        revalidate: 5,
    });

    return (
        <div className="">
            Main page header cache test: {new Date().toISOString()}
        </div>
    );
}
