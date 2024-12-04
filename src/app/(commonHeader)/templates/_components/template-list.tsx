import { TemplateDTO } from "@/dto/templates.dto";
import TemplateListItem from "./template-list-item";

type Props = {
    templates: TemplateDTO[];
};

export default function TemplateList({ templates }: Props) {
    if (!templates.length)
        return <p className="mx-auto w-fit italic">No templates found</p>;

    return (
        <ul className="flex flex-col gap-4">
            {templates.map((template) => (
                <TemplateListItem key={template.id} template={template} />
            ))}
        </ul>
    );
}
