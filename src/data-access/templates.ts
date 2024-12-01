import type { Template } from "@prisma/client";
import prisma from "@/lib/prisma";

// class TemplateDTO {
//     constructor(
//         public id: string,
//         public name: string,
//         public description: string | null
//     ) {}

//     public isDescriptionEmpty(): boolean {
//         return this.description === null;
//     }
// }

type TemplateDTO = {
    id: string;
    name: string;
    description: string | null;
};

const createTemplateDTO = (template: Template): TemplateDTO => {
    return {
        id: template.id,
        name: template.name,
        description: template.description,
    };
};

export const getAllTemplates = async (): Promise<TemplateDTO[]> => {
    const templates = await prisma.template.findMany();

    return templates.map((template) => createTemplateDTO(template));
};

export const getTemplate = async (id: string): Promise<TemplateDTO | null> => {
    const template = await prisma.template.findUnique({
        where: {
            id,
        },
    });

    return template ? createTemplateDTO(template) : null;
};
