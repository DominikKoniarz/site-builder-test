import { Suspense } from "react";
import MainPageContent from "./main-page-content";

// export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <main className="h-fit w-full bg-slate-800 text-white">
            <Suspense fallback={<div>Loading...</div>}>
                <MainPageContent />
            </Suspense>
        </main>
    );
}
