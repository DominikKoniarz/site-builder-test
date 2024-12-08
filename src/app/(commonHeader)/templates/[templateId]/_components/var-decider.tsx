import {
    TemplateBannerVariableSchema,
    TemplateTextVariableSchema,
} from "@/schema/template-edit-schema";
import TemplateTextVariable from "./template-text-variable";

type Props = {
    index: number;
    templateVariable: TemplateTextVariableSchema | TemplateBannerVariableSchema;
};

export default function VarDecider({ index, templateVariable }: Props) {
    if (templateVariable.type === "TEXT") {
        return <TemplateTextVariable index={index} />;
    }

    if (templateVariable.type === "BANNER") {
        return (
            <p key={templateVariable.id}>
                {templateVariable.type} {templateVariable.name}
            </p>
        );
    }

    return null;
}
