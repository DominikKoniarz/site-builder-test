import type { VariableType } from "@prisma/client";

export type TemplateVariableBaseDTO = {
    id: string;
    name: string;
    tag: string;
    type: VariableType;
    order: number;
    updatedAt: Date;
    createdAt: Date;
};

export type TemplateTextVariableDTO = TemplateVariableBaseDTO & {};

export type TemplateBannerVariableConfigDTO = {
    id: string;
    imageWidth: number;
    imageHeight: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TemplateBannerVariableDTO = TemplateVariableBaseDTO & {
    config: TemplateBannerVariableConfigDTO | null;
};
