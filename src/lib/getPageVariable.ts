import { VariableType as DbVariableType } from "@prisma/client";

type VariableType = DbVariableType;

type Variables = {
    id: string;
    templateVariable: {
        id: string;
        name: string;
        tag: string;
        type: VariableType;
    } | null;
    bannerVariable: BannerVariable | null;
    textVariable: TextVariable | null;
};

type TextVariable = {
    id: string;
    value: string | null;
    createdAt: Date;
    updatedAt: Date;
};

type BannerVariable = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    images: BannerImage[];
};

type BannerImage = {
    id: string;
    imageName: string;
    createdAt: Date;
    updatedAt: Date;
};

export function getPageVariable(
    variables: Variables[],
    tag: string,
    type: "TEXT",
): TextVariable | null;

export function getPageVariable(
    variables: Variables[],
    tag: string,
    type: "BANNER",
): BannerVariable | null;

export function getPageVariable(
    variables: Variables[],
    tag: string,
    type: VariableType,
): TextVariable | BannerVariable | null {
    const variable = variables.find((v) => {
        return (
            v.templateVariable &&
            v.templateVariable.tag === tag &&
            v.templateVariable.type === type
        );
    });

    if (!variable) return null;

    if (type === "TEXT") {
        return variable.textVariable;
    }

    if (type === "BANNER") {
        return variable.bannerVariable;
    }

    return null;
}
