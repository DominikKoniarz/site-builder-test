import { VariableType } from "@prisma/client";

// Template variable base
export type TemplateVariableBaseDTO = {
    id: string;
    name: string;
    tag: string;
    order: number;
    updatedAt: Date;
    createdAt: Date;
};

// Additional types nested in vars dto's
export type TemplateBannerVariableConfigDTO = {
    id: string;
    imageWidth: number;
    imageHeight: number;
    createdAt: Date;
    updatedAt: Date;
};

// Final vars definitions
export type TemplateTextVariableDTO = TemplateVariableBaseDTO & {
    type: (typeof VariableType)["TEXT"];
};

export type TemplateBannerVariableDTO = TemplateVariableBaseDTO & {
    type: (typeof VariableType)["BANNER"];
    config: TemplateBannerVariableConfigDTO | null;
};

// Template variable union
export type TemplateVariableDTO =
    | TemplateTextVariableDTO
    | TemplateBannerVariableDTO;
