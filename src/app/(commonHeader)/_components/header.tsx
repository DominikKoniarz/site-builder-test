import { appRoutes } from "@/config/routes";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full border-b-2 border-b-slate-200">
            <nav className="mx-auto flex w-fit flex-row items-center gap-5 p-5 text-base font-bold text-white">
                {appRoutes.map((link) => (
                    <Link key={link.href} href={link.href}>
                        {link.text}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
