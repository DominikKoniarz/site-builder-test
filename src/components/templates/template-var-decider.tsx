import type { TemplateAddSchema } from "@/schema/templates/template-add-schema";
import TemplateTextVariable from "./variables/text/template-text-variable";
import TemplateBannerVariable from "./variables/banner/template-banner-variable";
import SortableVariableWrapper from "./variables/sortable-variable-wrapper";

type Props = {
    index: number;
    variable: TemplateAddSchema["variables"][number]; // Add schema type bc more narrow
};

export default function TemplateVarDecider({ index, variable }: Props) {
    if (variable.type === "TEXT") {
        return (
            <SortableVariableWrapper frontendId={variable.frontendId}>
                <TemplateTextVariable index={index} />
            </SortableVariableWrapper>
        );
    }

    if (variable.type === "BANNER") {
        return (
            <SortableVariableWrapper frontendId={variable.frontendId}>
                <TemplateBannerVariable index={index} />
            </SortableVariableWrapper>
        );
    }

    return null;
}
