import { VariableType } from "@prisma/client";
import { BannerVariableDTO, TextVariableDTO } from "@/dto/variables.dto";
import { PageWithVariablesDTO } from "@/dto/pages.dto";

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
    variables: PageWithVariablesDTO,
    tagWithType: TextVariableTagWithType,
): TextVariableDTO | null;

export function getPageVariable(
    variables: PageWithVariablesDTO,
    tagWithType: BannerVariableTagWithType,
): BannerVariableDTO | null;
// functions overloads end

export function getPageVariable(
    page: PageWithVariablesDTO,
    tagWithType: TextVariableTagWithType | BannerVariableTagWithType,
): TextVariableDTO | BannerVariableDTO | null {
    const variables = page.variables;

    const [typePrefix, tag] = tagWithType.split(".");
    const variableByTag = variables.find((v) => v.tag === tag);

    if (!variableByTag) return null;

    if (typePrefix === VAR_TYPE_TO_SIGN.TEXT) {
        return variableByTag;
    }

    if (typePrefix === VAR_TYPE_TO_SIGN.BANNER) {
        return variableByTag;
    }

    return null;
}
