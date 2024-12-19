import type { VariableType } from "@prisma/client";

export type DbFetchedTemplateWithVariables = {
    id: string;
    name: string;
    description: string | null;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    variables: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        tag: string;
        type: VariableType;
        bannerTemplateVariableConfig: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            imageWidth: number;
            imageHeight: number;
        } | null;
    }[];
};
