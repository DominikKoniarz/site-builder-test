import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import type { PageVariableDTO } from "@/dto/variables.dto";
import PageTextVariable from "./variables/text/page-text-variable";

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

    if (formVariable.type == "BANNER") {
        return (
            <div>
                <p>Banner</p>
            </div>
        );
    }

    return null;
}
