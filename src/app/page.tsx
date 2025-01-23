import { appRoutes } from "@/config/routes";
// import { getPageWithVariablesBySlug } from "@/data-access/pages";
// import { getPageVariable } from "@/lib/get-page-variable";
import Link from "next/link";

export default async function Home() {
    // const page = await getPageWithVariablesBySlug("/");

    // if (page) {
    //     const text = getPageVariable(page, "t.text1");
    //     console.log(text);
    // }

    return (
        <main className="grid h-full w-full flex-1 place-items-center bg-slate-800 text-white">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-bold">Links</h1>
                <ul className="flex flex-col gap-4">
                    {appRoutes.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}> {link.text} </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
