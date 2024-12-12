import type { VariableType } from "@prisma/client";
import TemplateTextVariable from "./variables/text/template-text-variable";
import TemplateBannerVariable from "./variables/banner/template-banner-variable";

type Props = {
    index: number;
    templateVariableType: VariableType;
};

export default function TemplateVarDecider({
    index,
    templateVariableType,
}: Props) {
    if (templateVariableType === "TEXT") {
        return <TemplateTextVariable index={index} />;
    }

    if (templateVariableType === "BANNER") {
        return <TemplateBannerVariable index={index} />;
    }

    return null;
}
