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
