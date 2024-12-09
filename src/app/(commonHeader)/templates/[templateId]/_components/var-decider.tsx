import type { VariableType } from "@prisma/client";
import TemplateTextVariable from "./template-text-variable";
import TemplateBannerVariable from "./template-banner-variable";

type Props = {
    index: number;
    templateVariableType: VariableType;
};

export default function VarDecider({ index, templateVariableType }: Props) {
    if (templateVariableType === "TEXT") {
        return <TemplateTextVariable index={index} />;
    }

    if (templateVariableType === "BANNER") {
        return <TemplateBannerVariable index={index} />;
    }

    return null;
}
