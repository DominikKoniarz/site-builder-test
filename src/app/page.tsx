import { appRoutes } from "@/config/routes";
import Link from "next/link";

export default function Home() {
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
