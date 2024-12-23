import type { PageDTO } from "@/dto/pages.dto";
import { Edit } from "lucide-react";
import Link from "next/link";

type Props = {
    page: PageDTO;
};

export default function PageListItem({ page }: Props) {
    const generatePageLink = (template: PageDTO): string => {
        return `/pages/${template.id}`;
    };

    return (
        <div className="flex flex-row items-center gap-6 rounded-md border border-slate-200 bg-slate-800 px-6 py-3">
            <h2 className="text-base font-medium">{page.name}</h2>
            <p className="text-sm font-medium">{page.id}</p>
            <div className="ml-auto flex h-fit w-fit flex-row items-center gap-4">
                <Link href={generatePageLink(page)}>
                    <Edit />
                </Link>
                {/* <MovePageButton /> */}
            </div>
        </div>
    );
}
