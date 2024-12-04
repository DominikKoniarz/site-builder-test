import type { TemplateDTO } from "@/dto/templates.dto";
import { Edit } from "lucide-react";
import Link from "next/link";

type Props = {
    template: TemplateDTO;
};

export default function TemplateListItem({ template }: Props) {
    const generateTemplateLink = (template: TemplateDTO) => {
        return `/templates/${template.id}`;
    };

    return (
        <li className="flex flex-row items-center gap-6 rounded-md border border-slate-200 px-6 py-3">
            <h2 className="text-base font-medium">{template.name}</h2>
            <p className="text-sm font-medium">{template.id}</p>
            <Link href={generateTemplateLink(template)}>
                <Edit />
            </Link>
        </li>
    );
}
