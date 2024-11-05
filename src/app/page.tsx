import { Suspense } from "react";
import MainPageContent from "./main-page-content";
import MainPageHeader from "./main-page-header";

// export const dynamic = "force-dynamic";

export default async function Home() {
    return (
        <main className="h-fit w-full bg-slate-800 text-white">
            <MainPageHeader />
            <Suspense fallback={<div>Loading...</div>}>
                <MainPageContent />
            </Suspense>
        </main>
    );
}
