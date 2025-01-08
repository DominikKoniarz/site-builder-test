import type { PageState } from "@prisma/client";
import type { PageVariableDTO } from "./variables.dto";

export type PageBaseDTO = {
    id: string;
    state: PageState;
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
