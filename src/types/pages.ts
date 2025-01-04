import type { VariableType } from "@prisma/client";

export type DbFetchedPageWithVariables = {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    variables: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        templateVariable: {
            id: string;
            name: string;
            order: number;
            tag: string;
            type: VariableType;
            createdAt: Date;
            updatedAt: Date;
            bannerTemplateVariableConfig: {
                id: string;
                imageWidth: number;
                imageHeight: number;
            } | null;
        };
        textVariable: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            value: string | null;
        } | null;
        bannerVariable: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            images: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                imageName: string;
                order: number;
                cropX: number;
                cropY: number;
                cropWidth: number;
                cropHeight: number;
            }[];
        } | null;
    }[];
};
