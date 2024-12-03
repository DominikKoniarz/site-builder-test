import { DbFetchedVariable } from "@/types/variables";
import { VariableType } from "@prisma/client";
import { BannerVariableDTO, TextVariableDTO } from "./variables.dto";

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
    variables: DbFetchedVariable[],
    tagWithType: TextVariableTagWithType,
): TextVariableDTO | null;

export function getPageVariable(
    variables: DbFetchedVariable[],
    tagWithType: BannerVariableTagWithType,
): BannerVariableDTO | null;
// functions overloads end

export function getPageVariable(
    variables: DbFetchedVariable[],
    tagWithType: TextVariableTagWithType | BannerVariableTagWithType,
): TextVariableDTO | BannerVariableDTO | null {
    const [type, tag] = tagWithType.split(".");
    const variableByTag = variables.find(
        (v) => v.templateVariable && v.templateVariable.tag === tag,
    );

    if (!variableByTag) return null;

    if (type === VAR_TYPE_TO_SIGN.TEXT) {
        return variableByTag.textVariable;
    }

    if (type === VAR_TYPE_TO_SIGN.BANNER) {
        return variableByTag.bannerVariable;
    }

    return null;
}
