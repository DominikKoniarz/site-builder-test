import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import type { PageVariableDTO } from "@/dto/variables.dto";
import PageTextVariable from "./variables/text/page-text-variable";
import PageBannerVariable from "./variables/banner/page-banner-variable";
import { PageBannerVarContextProvider } from "@/context/page-banner-var-context";

type Props = {
    index: number;
    formVariable: PageEditSchema["variables"][number];
    dbVariable: PageVariableDTO;
};

export default function PageVarDecider({
    index,
    formVariable,
    dbVariable,
}: Props) {
    if (formVariable.type == "TEXT") {
        return <PageTextVariable index={index} dbVariable={dbVariable} />;
    }

    if (formVariable.type == "BANNER" && dbVariable.type == "BANNER") {
        // && dbVariable.type == "BANNER" for context type safety
        return (
            <PageBannerVarContextProvider index={index} dbVariable={dbVariable}>
                <PageBannerVariable />
            </PageBannerVarContextProvider>
        );
    }

    return null;
}
