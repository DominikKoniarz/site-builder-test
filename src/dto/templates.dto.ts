import type { TemplateVariableDTO } from "./template-variables.dto";

export type TemplateBaseDTO = {
    id: string;
    name: string;
    description: string | null;
    order: number;
};

export type TemplateDTO = TemplateBaseDTO;

export type TemplateWithVariablesDTO = {
    id: string;
    name: string;
    description: string | null;
    variables: TemplateVariableDTO[];
};
