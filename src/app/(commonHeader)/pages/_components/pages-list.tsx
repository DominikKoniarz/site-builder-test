import type { PageDTO } from "@/dto/pages.dto";
import PageListItem from "./page-list-item";

type Props = {
    pages: PageDTO[];
};

export default function PagesList({ pages }: Props) {
    return (
        <ul className="flex w-full flex-col gap-4">
            {pages.map((page) => (
                <PageListItem key={page.id} page={page} />
            ))}
        </ul>
    );
}
