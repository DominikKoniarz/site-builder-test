import {
    BannerVariable,
    DbFetchedVariable,
    TextVariable,
} from "@/types/variables";
import { VariableType } from "@prisma/client";

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
): TextVariable | null;

export function getPageVariable(
    variables: DbFetchedVariable[],
    tagWithType: BannerVariableTagWithType,
): BannerVariable | null;
// functions overloads end

export function getPageVariable(
    variables: DbFetchedVariable[],
    tagWithType: TextVariableTagWithType | BannerVariableTagWithType,
): TextVariable | BannerVariable | null {
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
