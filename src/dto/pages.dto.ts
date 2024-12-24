import type { PageVariableDTO } from "./variables.dto";

export type PageBaseDTO = {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    updatedAt: Date;
    createdAt: Date;
};

export type PageDTO = PageBaseDTO;

export type PageWithVariablesDTO = PageBaseDTO & {
    variables: PageVariableDTO[];
};
