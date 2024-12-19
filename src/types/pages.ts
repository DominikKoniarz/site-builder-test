import type { Prisma } from "@prisma/client";

export type DbFetchedPageWithVariables = Prisma.PageGetPayload<{
    select: {
        id: true;
        name: true;
        description: true;
        slug: true;
        createdAt: true;
        updatedAt: true;
        variables: {
            select: {
                createdAt: true;
                updatedAt: true;
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
        };
    };
}>;
