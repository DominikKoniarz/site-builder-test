import type { TemplateVariableDTO } from "./template-variables.dto";

export type TemplateBaseDTO = {
    id: string;
    name: string;
    description: string | null;
    order: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TemplateDTO = TemplateBaseDTO;

export type TemplateWithVariablesDTO = TemplateDTO & {
    variables: TemplateVariableDTO[];
};
