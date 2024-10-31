import { VariableType as DbVariableType } from "@prisma/client";

type VariableType = DbVariableType;

type Variables = {
    id: string;
    templateVariable: {
        id: string;
        name: string;
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

// Definicje przeciążeń funkcji
export function getPageVariable(
    variables: Variables[],
    name: string,
    type: "TEXT",
): TextVariable | null;

export function getPageVariable(
    variables: Variables[],
    name: string,
    type: "BANNER",
): BannerVariable | null;

// Implementacja funkcji
export function getPageVariable(
    variables: Variables[],
    name: string,
    type: VariableType,
): TextVariable | BannerVariable | null {
    const variable = variables.find((v) => {
        return (
            v.templateVariable &&
            v.templateVariable.name === name &&
            v.templateVariable.type === type
        );
    });

    if (!variable) return null;

    if (type === "TEXT") {
        return variable.textVariable as TextVariable | null;
    }

    if (type === "BANNER") {
        return variable.bannerVariable as BannerVariable | null;
    }

    return null; // To nigdy nie powinno się zdarzyć z uwagi na sprawdzenie typu
}
