import { TemplateDTO } from "@/data-access/templates";
import TemplateListItem from "./template-list-item";

type Props = {
    templates: TemplateDTO[];
};

export default function TemplateList({ templates }: Props) {
    return (
        <ul className="flex flex-col gap-4">
            {templates.map((template) => (
                <TemplateListItem key={template.id} template={template} />
            ))}
        </ul>
    );
}
