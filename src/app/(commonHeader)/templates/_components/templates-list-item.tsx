import type { TemplateDTO } from "@/dto/templates.dto";
import { Edit } from "lucide-react";
import Link from "next/link";
import TemplatesListItemWrapper from "./templates-list-item-wrapper";
import MoveTemplateButton from "./move-template-button";

type Props = {
    template: TemplateDTO;
};

export default function TemplatesListItem({ template }: Props) {
    const generateTemplateLink = (template: TemplateDTO) => {
        return `/templates/${template.id}`;
    };

    return (
        <TemplatesListItemWrapper id={template.id}>
            <div className="flex flex-row items-center gap-6 rounded-md border border-slate-200 bg-slate-800 px-6 py-3">
                <h2 className="text-base font-medium">{template.name}</h2>
                <p className="text-sm font-medium">{template.id}</p>
                <div className="ml-auto flex h-fit w-fit flex-row items-center gap-4">
                    <Link href={generateTemplateLink(template)}>
                        <Edit />
                    </Link>
                    <MoveTemplateButton />
                </div>
            </div>
        </TemplatesListItemWrapper>
    );
}
