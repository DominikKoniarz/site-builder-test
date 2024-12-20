import { getAllPages } from "@/data-access/pages";

export default async function Pages() {
    const pages = await getAllPages();

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Pages</h1>
                {pages.map((page) => (
                    <div key={page.id} className="flex flex-col gap-2">
                        <h2 className="text-lg font-bold">{page.name}</h2>

                        <p>{page.slug}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
