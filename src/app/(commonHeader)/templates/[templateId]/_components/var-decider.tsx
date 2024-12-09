import {
    TemplateBannerVariableSchema,
    TemplateTextVariableSchema,
} from "@/schema/template-edit-schema";
import TemplateTextVariable from "./template-text-variable";
import TemplateBannerVariable from "./template-banner-variable";

type Props = {
    index: number;
    templateVariable: TemplateTextVariableSchema | TemplateBannerVariableSchema;
};

export default function VarDecider({ index, templateVariable }: Props) {
    if (templateVariable.type === "TEXT") {
        return <TemplateTextVariable index={index} />;
    }

    if (templateVariable.type === "BANNER") {
        return <TemplateBannerVariable index={index} />;
    }

    return null;
}
