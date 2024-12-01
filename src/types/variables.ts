import type { Prisma } from "@prisma/client";

export type DbFetchedVariable = Prisma.PageVariableGetPayload<{
    select: {
        id: true;
        templateVariable: {
            select: {
                id: true;
                name: true;
                tag: true;
                type: true;
            };
        };
        bannerVariable: {
            select: {
                id: true;
                createdAt: true;
                updatedAt: true;
                images: {
                    select: {
                        id: true;
                        imageName: true;
                        order: true;
                        createdAt: true;
                        updatedAt: true;
                    };
                };
            };
        };
        textVariable: {
            select: {
                id: true;
                value: true;
                createdAt: true;
                updatedAt: true;
            };
        };
    };
}>;

// Types of vars accesed in app after extracting from page variables
export type TextVariable = {
    id: string;
    value: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type BannerImage = {
    id: string;
    imageName: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};

export type BannerVariable = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    images: BannerImage[];
};
