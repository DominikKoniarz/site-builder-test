import type { PageDTO } from "@/dto/pages.dto";
import { Edit } from "lucide-react";
import Link from "next/link";

type Props = {
    page: PageDTO;
};

export default function PageListItem({ page }: Props) {
    const generatePageEditLink = (page: PageDTO): string => {
        return `/pages/${page.id}`;
    };

    const generatePagePublicLink = (page: PageDTO): string => {
        return page.slug;
    };

    return (
        <div className="flex flex-row items-center justify-between gap-6 rounded-md border border-slate-200 bg-slate-800 px-6 py-3">
            <h2 className="text-base font-medium">{page.name}</h2>
            <Link href={generatePagePublicLink(page)} target="_blank">
                Visit page
            </Link>
            <div className="flex h-fit w-fit flex-row items-center gap-4">
                <Link href={generatePageEditLink(page)}>
                    <Edit />
                </Link>
                {/* <MovePageButton /> */}
            </div>
        </div>
    );
}
