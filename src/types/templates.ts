import type { Prisma } from "@prisma/client";

export type DbFetchedTemplateWithVariables = Prisma.TemplateGetPayload<{
    select: {
        id: true;
        name: true;
        description: true;
    };
    include: {
        variables: {
            select: {
                id: true;
                name: true;
                tag: true;
                type: true;
                order: true;
                updatedAt: true;
                createdAt: true;
                bannerTemplateVariableConfig: {
                    select: {
                        id: true;
                        imageWidth: true;
                        imageHeight: true;
                        createdAt: true;
                        updatedAt: true;
                    };
                };
            };
        };
    };
}>;
