import { VariableType } from "@prisma/client";
import { DbFetchedPageWithVariables } from "@/types/pages";
import { createPageVariableDTO } from "@/dto/variables.mappers";
import { BannerVariableDTO, TextVariableDTO } from "@/dto/variables.dto";

type VarTypeToSign = {
    [VariableType.TEXT]: "t";
    [VariableType.BANNER]: "b";
};

const VAR_TYPE_TO_SIGN: VarTypeToSign = {
    [VariableType.TEXT]: "t",
    [VariableType.BANNER]: "b",
};

type TextVariableTagWithType = `${VarTypeToSign["TEXT"]}.${string}`;
type BannerVariableTagWithType = `${VarTypeToSign["BANNER"]}.${string}`;

// functions overloads start
export function getPageVariable(
    variables: DbFetchedPageWithVariables,
    tagWithType: TextVariableTagWithType,
): TextVariableDTO | null;

export function getPageVariable(
    variables: DbFetchedPageWithVariables,
    tagWithType: BannerVariableTagWithType,
): BannerVariableDTO | null;
// functions overloads end

export function getPageVariable(
    page: DbFetchedPageWithVariables,
    tagWithType: TextVariableTagWithType | BannerVariableTagWithType,
): TextVariableDTO | BannerVariableDTO | null {
    const variables = page.variables;

    const [type, tag] = tagWithType.split(".");
    const variableByTag = variables.find(
        (v) => v.templateVariable && v.templateVariable.tag === tag,
    );

    if (!variableByTag) return null;

    if (type === VAR_TYPE_TO_SIGN.TEXT) {
        return createPageVariableDTO(variableByTag);
    }

    if (type === VAR_TYPE_TO_SIGN.BANNER) {
        return createPageVariableDTO(variableByTag);
    }

    return null;
}
